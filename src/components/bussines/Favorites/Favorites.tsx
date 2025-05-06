import React from "react";

import PokemonsLayout from "../../../layouts/PokemonsLayout/PokemonsLayout";
import { DetailedPokemon } from "../../../types";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

import "./Favorites.css";

const Favorites: React.FC = () => {
  const [favoritesPokemons, setFavoritesPokemons] = React.useState<
    DetailedPokemon[]
  >(JSON.parse(localStorage.getItem("favorites") || "[]"));

  const deleteFavorite = (pokemon: DetailedPokemon) => {
    const updatedFavorites = favoritesPokemons.filter(
      (fav) => fav.name !== pokemon.name
    );
    setFavoritesPokemons(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (pokemon: DetailedPokemon) =>
    favoritesPokemons.some((fav) => fav.name === pokemon.name);

  return (
    <PokemonsLayout>
      {!favoritesPokemons.length && <h1>No favorites pokemons, added yet</h1>}
      {favoritesPokemons.map((pokemon, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          key={index}
          className="favorites__item"
        >
          <Card className="favorites__card" component="div">
            <Grid className="favorites__cardContainer">
              <CardMedia component="img" height="300" image={pokemon.image} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="favorites__description"
                >
                  {pokemon.name}
                  <span
                    className="favorites__deleteButton"
                    onClick={() => deleteFavorite(pokemon)}
                  >
                    {isFavorite(pokemon) && "Remove from Favorites"}
                  </span>
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      ))}
    </PokemonsLayout>
  );
};

export default Favorites;
