import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiMusicUrl } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { ArtistList } from "../../components/ArtistList/ArtistList";

import styles from "./GenreView.module.scss";
import { IArtist } from "../../components/Artists/Artist.types";

export const GenreView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("s") || "");
  const [displaying, setDisplaying] = useState("genres");
  const [genreId, setGenreId] = useState(0);

  const { doFetch, results, setResults, error, setError, isLoading } =
    useFetch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDisplaying("genres");

    if (e.target.value.length < 3) {
      console.log("remove");
      setResults([]);
      searchParams.delete("s");
      searchParams.delete("genreid");
      setSearchParams(searchParams);
      return;
    }

    doFetch(`${apiMusicUrl}/genres?q=${e.target.value}`);
  };

  const handleClickArtist = useCallback(
    (genreId: number) => {
      setDisplaying("artists");
      doFetch(`${apiMusicUrl}/genres/${genreId}/artists`);
      setGenreId(genreId);
    },
    [doFetch]
  );

  useEffect(() => {
    if (search.length === 0) setError("");
  }, [search, setError]);

  useEffect(() => {
    const genreid = searchParams.get("genreid");
    if (genreid) {
      handleClickArtist(parseInt(genreid));
    }
  }, [handleClickArtist, searchParams]);

  return (
    <article className={styles.genreview}>
      <header>
        <Link to={`mylist?&${searchParams.toString()}`}>View My List</Link>
        <h3>Enter a genre to find artists:</h3>
      </header>

      <section className={styles.search}>
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
        />

        {isLoading && <strong>Loading data...</strong>}
      </section>

      {displaying === "genres" && results.length > 0 && (
        <section className={styles.genreslist}>
          <ul>
            {results.map((x) => (
              <li key={x.id}>
                <button onClick={() => handleClickArtist(x.id)}>
                  {x.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        {!error &&
          !isLoading &&
          displaying === "genres" &&
          !results.length &&
          search.length >= 3 && (
            <h3>No results were found for genre: {search}</h3>
          )}

        {error && <h3>{error}</h3>}
      </section>

      {!error && (
        <section className={styles.results}>
          {!isLoading && displaying === "artists" && (
            <ArtistList
              artistsList={results}
              renderName={(artist: IArtist, element: JSX.Element) => (
                <Link to={`artist/${artist.id}?s=${search}&genreid=${genreId}`}>
                  {element}
                </Link>
              )}
            />
          )}
        </section>
      )}
    </article>
  );
};
