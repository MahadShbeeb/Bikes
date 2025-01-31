import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingPage = () => {
  const [bodyPadding, setBodyPadding] = React.useState<any>("0px");
  React.useEffect(() => {
    if (document.body.style.paddingTop) {
      setBodyPadding(document.body.style.paddingTop);
      // console.log(document.body.style.paddingTop);
    }
  }, []);

  return (
    <Box
      sx={{
        height: `calc( 100vh + ${bodyPadding} )`,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        backgroundColor: "#2A3C49",
        flexDirection: "column",
        top: `-${bodyPadding}`,
      }}
    >
      <Box marginBottom={20}></Box>
      <CircularProgress
        sx={{
          color: "#92CFD8",
        }}
      />
    </Box>
  );
};

export default LoadingPage;
