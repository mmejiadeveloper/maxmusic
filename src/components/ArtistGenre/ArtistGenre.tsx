import styles from "./ArtistGenre.module.scss";

interface ArtistExpandedGenreProps {
  popularity: string;
  primaryGenre: string;
}

export const ArtistExpandedGenre = ({
  popularity,
  primaryGenre,
}: ArtistExpandedGenreProps) => (
  <section className={styles.expandedgenres}>
    <p>
      <strong>Primary Genre:</strong> <strong>{primaryGenre}</strong>
    </p>
    <p>
      <strong>Popularity Score:</strong> <strong>{popularity}</strong>
    </p>
  </section>
);

export const ArtistBaseGenre = ({ genre }: { genre: string }) => (
  <p className={styles.expandedgenres}>
    <strong>Genre: </strong> <strong>{genre}</strong>
  </p>
);
