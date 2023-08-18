import { IArtist } from "../components/Artists/Artist.types";

export function getArtistGenres(artist: IArtist) {
  const primaryGenre =
    artist?.genres?.find((x) => x.is_primary === 1)?.name ?? "";

  const aditionalGenres = artist?.genres
    ?.map((x) => x.name)
    .filter((x) => x !== primaryGenre)
    .join(", ");

  return {
    primaryGenre,
    aditionalGenres,
  };
}
