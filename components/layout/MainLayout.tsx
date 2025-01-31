import { Box } from "@mui/material";
import React from "react";
import NavBar from "./navbar/NavBar";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const currentPath = usePathname();

  return (
    <Box>
      <NavBar />

      <Box
        sx={{
          minHeight: currentPath === "/contact-us" ? "50vh" : "100vh",
          paddingTop: currentPath !== "/" ? "8rem" : "",
          backgroundColor: "transparent",
        }}
      >
        {" "}
        {children}
      </Box>
    </Box>
  );
}
