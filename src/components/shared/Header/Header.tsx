import React from "react";
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

import "./Header.css";

const Header: React.FC = () => {
  return (
    <Grid className="header" container spacing={2}>
      <Grid className="">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          Pokemons
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "header__link header__link--active" : "header__link"
          }
        >
          Favorites
        </NavLink>
      </Grid>
    </Grid>
  );
};

export default Header;
