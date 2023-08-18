import React, { useContext } from "react";
import { ArtistsContext } from "../../context/artists";
import { ArtistList } from "../../components/ArtistList/ArtistList";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./Mylist.module.scss";
import { IArtist } from "../../components/Artists/Artist.types";

export const MyList = () => {
  const { state } = useContext(ArtistsContext);
  const [searchParams] = useSearchParams();

  return (
    <article className={styles.mylist}>
      <header>
        <Link to={`/?${searchParams.toString()}`}>Back to Search</Link>
      </header>

      <h1>Favorite list</h1>
      <section className={styles.results}>
        <ArtistList
          artistsList={state.savedList}
          renderName={(_: IArtist, element: JSX.Element) => (
            <span>{element}</span>
          )}
        />
      </section>
    </article>
  );
};
