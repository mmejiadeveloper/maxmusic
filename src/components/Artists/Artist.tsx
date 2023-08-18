import styles from "./Artist.module.scss";
import {
  ArtistBaseProps,
  ArtistProps,
  ExpandedDataProps,
} from "./Artist.types";

import {
  ArtistBaseGenre,
  ArtistExpandedGenre,
} from "../ArtistGenre/ArtistGenre";
import { useContext } from "react";
import { ArtistsContext } from "../../context/artists";

const ExpandedData = ({ genres }: ExpandedDataProps) => (
  <>
    {!!genres && (
      <p className={styles.expandedgenres}>
        <strong>Aditional Genres:</strong>
        <strong>{genres}</strong>
      </p>
    )}
  </>
);

const ArtistBase = ({ artist, children, renderName }: ArtistBaseProps) => {
  const { id, image, name } = artist;
  const { state, dispatch } = useContext(ArtistsContext);

  const artistIsAlreadyAdded = state.savedList.filter((x) => x.id === id);

  const handleArtistAction = () => {
    if (artistIsAlreadyAdded.length) {
      dispatch({ type: "REMOVE_ITEM", payload: artist.id });
      return;
    }
    dispatch({ type: "ADD_ITEM", payload: artist });
  };

  return (
    <>
      <img src={image} alt="" />
      <section className={styles.details}>
        {renderName(<h2>{name}</h2>)}
        {children}
      </section>
      <button onClick={handleArtistAction}>
        {!artistIsAlreadyAdded.length ? "Add" : "Remove"}
      </button>
    </>
  );
};

export const Artist = ({ children }: ArtistProps) => (
  <article className={styles.artist}>{children}</article>
);

ArtistBase.BaseGenre = ArtistBaseGenre;
ArtistBase.ExpandedGenre = ArtistExpandedGenre;

Artist.ExpandedData = ExpandedData;
Artist.ArtistBase = ArtistBase;
