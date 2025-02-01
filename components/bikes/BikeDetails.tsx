import { Bike } from "@/types/Bike";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

type BikeDetailsProps = {
  bike: Bike;
};

const BikeDetails: React.FC<BikeDetailsProps> = ({ bike }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        padding: 3,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            my: 4,
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
                    background: "#F5F5F5",
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
                    background: "#F5F5F5",
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
                    background: "#F5F5F5",
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
              }}
            >
              {bike?.description}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", height: "20rem" }}>
            <Image
              src={bike?.large_img || "/assets/images/placeholder.jpg"}
              alt="Logo"
              fill
              sizes=""
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BikeDetails;
