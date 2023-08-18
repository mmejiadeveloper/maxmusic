import { getArtistGenres } from "../../utils/artist";
import { Artist } from "../Artists/Artist";
import { IArtist } from "../Artists/Artist.types";
import { Pagination } from "../Pagination/Pagination";

interface ArtistLinkProps {
  artistsList: IArtist[];
  renderName?: any;
}

export const ArtistList = ({ artistsList, renderName }: ArtistLinkProps) => (
  <Pagination resultsLength={artistsList.length}>
    {({ pageIni, pageEnd }) => {
      return artistsList.slice(pageIni, pageEnd)?.map((artist) => {
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
      });
    }}
  </Pagination>
);

export default ArtistList;
