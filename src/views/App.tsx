import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  ArtistsContext,
  artistsReducer,
  defaultSavedList,
} from "../context/artists";
import { GenreView } from "./GenreView/GenreView";
import { ArtistDetail } from "./ArtistDetail/ArtistDetail";
import { MyList } from "./MyList/MyList";
import { useReducer } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<GenreView />} />
      <Route path="artist/:id" element={<ArtistDetail />} />
      <Route path="mylist" element={<MyList />} />
    </>
  )
);

function App() {
  const [savedList, dispatch] = useReducer(
    artistsReducer,
    defaultSavedList.state
  );

  return (
    <ArtistsContext.Provider value={{ state: savedList, dispatch }}>
      <RouterProvider router={router} />
      <footer>
        <p>Take in home app for Music Audio Exchange by Miguel Mejia</p>
      </footer>
    </ArtistsContext.Provider>
  );
}

export default App;
