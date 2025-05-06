import React from "react";
import { Grid } from "@mui/material";

import "./PokemonsLayout.css";

interface PokemonsLayoutProps {
  children: React.ReactNode;
}

const PokemonsLayout: React.FC<PokemonsLayoutProps> = ({ children }) => {
  return (
    <Grid container spacing={2} className="pokemonsLayout">
      {children}
    </Grid>
  );
};

export default PokemonsLayout;
