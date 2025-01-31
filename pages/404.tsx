import { Box, Typography } from "@mui/material";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "40vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
        color: "#2A3C49",
        gap: "2rem",
      }}
    >
      <Typography variant="h4" fontFamily="monospace">
        404 - Page not found
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
