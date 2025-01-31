import axiosInstance from "@/axios/AxiosInstance";
import BikeDetails from "@/components/bikes/BikeDetails";
import { MAIN_CONTAINER_BREAK_POINT } from "@/constants/general";
import { Bike } from "@/types/Bike";
import { Container } from "@mui/material";
import axios from "axios";
import React from "react";

type BikePageProps = {
  bike: Bike;
};

const BikePage: React.FC<BikePageProps> = ({ bike }) => {
  return (
    <Container
      maxWidth={MAIN_CONTAINER_BREAK_POINT}
      sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}
    >
      <BikeDetails bike={bike} />
    </Container>
  );
};

export default BikePage;
export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  try {
    const { id } = params;

    const res = await axios.get(`https://bikeindex.org/api/v3/bikes/${id}`);

    const bike = res?.data?.bike;

    console.log("bike", bike);
    return {
      props: {
        bike,
      },
    };
  } catch (error: any) {
    return {
      notFound: true,
    };
  }
};
