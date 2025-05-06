import React from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";

import PokemonsLayout from "../../../layouts/PokemonsLayout/PokemonsLayout";
import { DetailedPokemon, Pokemon } from "../../../types";

import "./Pokemons.css";
import { fetchPokemons } from "../../../api/api";

const Pokemons: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<DetailedPokemon[]>([]);
  const [favoritesPokemons, setFavoritesPokemons] = React.useState<
    DetailedPokemon[]
  >(JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [offset, setOffset] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const observer = React.useRef<HTMLDivElement | null>(null);

  const fetchMorePokemons = React.useCallback(async () => {
    setLoading(true);
    try {
      const newPokemons = await fetchPokemons(20, offset);
      setPokemons((prev) => [...prev, ...newPokemons]);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  React.useEffect(() => {
    fetchMorePokemons();
  }, [fetchMorePokemons]);

  React.useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setOffset((prevOffset) => prevOffset + 10);
      }
    };

    const observerInstance = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (observer.current) {
      observerInstance.observe(observer.current);
    }

    return () => {
      if (observer.current) {
        observerInstance.unobserve(observer.current);
      }
    };
  }, [loading]);

  const handleFavorite = (pokemon: DetailedPokemon) => {
    const isFavorite = favoritesPokemons.some(
      (fav) => fav.name === pokemon.name
    );

    if (isFavorite) {
      const updatedFavorites = favoritesPokemons.filter(
        (fav) => fav.name !== pokemon.name
      );
      setFavoritesPokemons(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favoritesPokemons, pokemon];
      setFavoritesPokemons(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const isFavorite = (pokemon: DetailedPokemon) =>
    favoritesPokemons.some((fav) => fav.name === pokemon.name);

  return (
    <PokemonsLayout>
      {pokemons.map((pokemon, index) => (
        <Grid item xs={12} sm={6} md={6} key={index} className="pokemons__item">
          <Card className="pokemons__card" component="div">
            <Grid className="pokemons__cardContainer">
              <CardMedia component="img" height="300" image={pokemon.image} />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="pokemons__description"
                >
                  {pokemon.name}
                  <span
                    className={
                      isFavorite(pokemon)
                        ? "pokemons__deleteButton"
                        : "pokemons__addButton"
                    }
                    onClick={() => handleFavorite(pokemon)}
                  >
                    {isFavorite(pokemon)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </span>
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      ))}
      {loading && (
        <Grid item xs={12} style={{ textAlign: "center", margin: "20px 0" }}>
          <CircularProgress />
        </Grid>
      )}
      <div ref={observer} />
    </PokemonsLayout>
  );
};

export default Pokemons;
