import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import { Box, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        color: "#333",
      }}
    >
      <CssBaseline />
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Box>
  );
}
