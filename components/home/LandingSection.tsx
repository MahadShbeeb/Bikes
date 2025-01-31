import { Box } from "@mui/material";
import Image from "next/image";

const LandingSection = () => {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
      <Image
        fill
        src={"/assets/images/suburban-scene-houses-with-canals-bicycles.jpg"}
        alt="LandingSection"
        priority
        style={{
          objectFit: "cover",
        }}
        sizes=""
      />
    </Box>
  );
};

export default LandingSection;
