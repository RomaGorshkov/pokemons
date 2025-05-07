import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/shared/Header/Header";
import PokemonsPage from "./pages/PokemonsPage/PokemonsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<PokemonsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
};

export default App;
