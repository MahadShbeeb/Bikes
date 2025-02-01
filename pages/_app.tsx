import MainLayout from "@/components/layout/MainLayout";
import "@/styles/globals.css";
import { Box, CssBaseline, styled } from "@mui/material";
import type { AppProps } from "next/app";
import { MaterialDesignContent, SnackbarProvider } from "notistack";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "green",
    color: "#fff",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#D84040",
    color: "#fff",
  },
}));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
        maxSnack={3}
      >
        <CssBaseline />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SnackbarProvider>
    </Box>
  );
}
