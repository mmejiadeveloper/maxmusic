import { getArtistGenres } from "../../utils/artist";
import { Artist } from "../Artists/Artist";
import { IArtist } from "../Artists/Artist.types";

interface ArtistLinkProps {
  artistsList: IArtist[];
  renderName?: any;
}

export const ArtistList = ({ artistsList, renderName }: ArtistLinkProps) => (
  <>
    {artistsList?.map((artist) => {
      const { primaryGenre } = getArtistGenres(artist);

      return (
        <Artist key={artist.id}>
          <Artist.ArtistBase
            artist={artist}
            renderName={(element: JSX.Element) => renderName(artist, element)}
          >
            <Artist.ArtistBase.BaseGenre genre={primaryGenre} />
          </Artist.ArtistBase>
        </Artist>
      );
    })}
  </>
);
