import axios from "axios";

import { Pokemon, DetailedPokemon } from "../types";

const BASE_URL = process.env.REACT_APP_POKEAPI_BASE_URL;

export const fetchPokemons = async (
  limit: number,
  offset: number
): Promise<DetailedPokemon[]> => {
  const response = await axios.get<{ results: Pokemon[] }>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  const basicPokemons = response.data.results;

  const detailedResponses = await Promise.all(
    basicPokemons.map((pokemon) => axios.get(pokemon.url))
  );

  return detailedResponses.map((res) => ({
    name: res.data.name,
    image: res.data.sprites.front_default,
  }));
};
