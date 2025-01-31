import BikesList from "@/components/bikes/BikesList";
import { MAIN_CONTAINER_BREAK_POINT } from "@/constants/general";
import { Container } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Container maxWidth={MAIN_CONTAINER_BREAK_POINT}>
      <BikesList />
    </Container>
  );
};

export default index;
