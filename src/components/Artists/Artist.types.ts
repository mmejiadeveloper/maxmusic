import { ReactNode } from "react";

export interface ArtistProps {
  children?: ReactNode;
}

export interface IArtist {
  id: number;
  image: string;
  name: string;
  popularity?: string;
  genres?: any[];
}

export interface ArtistBaseProps {
  artist: IArtist;
  children?: ReactNode;
  renderName: (Wrapper: JSX.Element) => JSX.Element;
}

export interface ExpandedDataProps {
  genres: string;
}
