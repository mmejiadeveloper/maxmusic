import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { apiMusicUrl } from "../../constants";
import { Artist } from "../../components/Artists/Artist";
import { IArtist } from "../../components/Artists/Artist.types";
import { getArtistGenres } from "../../utils/artist";

import styles from "./ArtistDetail.module.scss";
import { ArtistList } from "../../components/ArtistList/ArtistList";

export const ArtistDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const { doFetch, error } = useFetch();

  const [artist, setArtist] = useState<IArtist | undefined>();
  const [similar, setSimilar] = useState<IArtist[]>([]);
  const [viewLoaded, setViewLoaded] = useState(false);
  const [errorFound, setErrorFound] = useState(false);

  const { primaryGenre, aditionalGenres } = getArtistGenres(artist!);

  useEffect(() => {
    (async () => {
      try {
        const [artistResponse, similarResponse] = await Promise.all<any>([
          doFetch(`${apiMusicUrl}/artists/${id}`),
          doFetch(`${apiMusicUrl}/artists/${id}/similar`),
        ]);

        setArtist(artistResponse?.data[0]);
        setSimilar(similarResponse?.data);
      } catch (error) {
        setErrorFound(true);
      } finally {
        setViewLoaded(true);
      }
    })();
  }, [doFetch, id]);

  const baseComponent = (
    <>
      <header>
        <Link to={`/?${searchParams.toString()}`}>Back to Search</Link>
      </header>
      <section className={styles.detailed}>
        {artist && (
          <Artist>
            <Artist.ArtistBase
              artist={artist}
              renderName={(element) => <strong>{element}</strong>}
            >
              <Artist.ArtistBase.ExpandedGenre
                popularity={artist.popularity!}
                primaryGenre={primaryGenre}
              />
            </Artist.ArtistBase>
            <Artist.ExpandedData genres={aditionalGenres!} />
          </Artist>
        )}
      </section>

      <article className={styles.similar}>
        <header>
          <h2>Related Artists</h2>
        </header>
        <ArtistList
          artistsList={similar}
          renderName={(_: IArtist, element: JSX.Element) => (
            <span>{element}</span>
          )}
        />
      </article>
    </>
  );

  if (errorFound || !!error)
    return <h1>There was an error loading the page, try again.</h1>;

  return (
    <article className={styles.artistdetail}>
      {viewLoaded ? baseComponent : <h1>hold tight we are working...</h1>}
    </article>
  );
};
