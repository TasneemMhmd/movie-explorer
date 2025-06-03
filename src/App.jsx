import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Header from "./components/header/Header";
import MoviesList from "./components/moviesList/MoviesList";
import Home from "./components/home/Home";
import Soon from "./components/soon/Soon";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/soon" element={<Soon />} />
      </Routes>
      <MoviesList />
    </>
  );
}

export default App;
