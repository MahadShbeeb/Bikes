import { Bike } from "@/types/Bike";
import { Grid, Typography } from "@mui/material";
import React from "react";
import BikeCard from "./BikeCard";

type BikesListProps = {
  bikes: Bike[];
};

const BikesList: React.FC<BikesListProps> = ({ bikes }) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
      {bikes.length === 0 ? (
        <Grid item xs={12}>
          <Typography
            align="center"
            sx={{ fontFamily: "Segoe UI", fontSize: "1.5rem" }}
          >
            No bikes available
          </Typography>
        </Grid>
      ) : (
        bikes.map((bike) => (
          <Grid item xs={12} md={6} key={bike.id}>
            <BikeCard bike={bike} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default BikesList;
