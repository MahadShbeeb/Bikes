import { Bike } from "@/types/Bike";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type BikeCardProps = {
  bike: Bike;
};

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{
        height: "17rem",
        border: "1px solid #E9E9E9",
        borderRadius: "10px",
      }}
    >
      <Grid
        item
        sm={4}
        xs={12}
        sx={{
          overflow: "hidden",
          borderRadius: { md: "10px 0 0 10px", xs: "10px 10px 0 0" },
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            alt=""
            src={bike?.large_img || "/assets/images/placeholder.jpg"}
            fill
            style={{
              // borderRadius: "10px",
              objectFit: "cover",
            }}
            sizes=""
          />
        </Box>
      </Grid>
      <Grid
        item
        sm={8}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: { sm: "1rem 2rem", xs: "1rem" },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              flexWrap: "wrap",
            }}
          >
            {bike?.date_stolen && (
              <Box
                sx={{
                  borderRadius: "10px",
                  background: "#E9E9E9",
                  padding: ".1rem 1rem",
                }}
              >
                Date of the theft:{bike?.date_stolen}
              </Box>
            )}
            {bike?.year && (
              <Box
                sx={{
                  borderRadius: "10px",
                  background: "#E9E9E9",
                  padding: ".1rem 1rem",
                }}
              >
                Date of the report:{bike?.year}
              </Box>
            )}
            {bike?.location_found && (
              <Box
                sx={{
                  borderRadius: "10px",
                  background: "#E9E9E9",
                  padding: ".1rem 1rem",
                }}
              >
                Location :{bike?.location_found}
              </Box>
            )}
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "1.2rem",
              fontWeight: 300,
              lineHeight: "40px",
              wordBreak: "break-word",
              display: "-webkit-box",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              height: "2rem",
              color: theme.palette.primary.main,
            }}
          >
            {bike?.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              fontWeight: 300,
              overflow: "hidden",
              wordBreak: "break-word",
              display: "-webkit-box",
              textOverflow: "ellipsis",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {bike?.description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: ".5rem",
            // flexDirection: { sm: "row", xs: "column" },
            marginTop: ".7rem",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
            href={`/stolen-bikes/${bike?.id}`}
          >
            Show Details
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BikeCard;
