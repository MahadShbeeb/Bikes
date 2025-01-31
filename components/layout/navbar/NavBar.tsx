import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";

import { MAIN_CONTAINER_BREAK_POINT } from "../../../constants/general";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { isPathMatch } from "@/utils/helper";
import { MainPage } from "@/types/MainPage";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const router = useRouter();
  const currentPath = usePathname();
  const theme = useTheme();

  const handleNavLinkClick = (route: string) => {
    setAnchorElNav(null);
    router.push(route);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const mainPages: MainPage[] = [
    {
      name: "HOME",
      route: "/",
    },
    {
      name: "Stolen bikes",
      route: "/stolen-bikes",
    },
  ];

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        boxShadow: "none",
        backgroundColor: theme.palette.background.default,
        color: "#333",
        transition: "background-color 0.3s ease",
      }}
    >
      <Container maxWidth={MAIN_CONTAINER_BREAK_POINT}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: "#333",
                // color: scrolled ? "#fff" : "#ffff",
              }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              disableScrollLock
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: theme.palette.background.default,
                },
              }}
            >
              {mainPages.map((page) => (
                <MenuItem
                  key={page.route}
                  onClick={() => handleNavLinkClick(page.route)}
                  selected={currentPath === page.route}
                  sx={{ color: "#333" }}
                >
                  <Typography
                    sx={{
                      color: "#333",
                      fontSize: "18px",
                      fontWeight: isPathMatch(currentPath, page.route)
                        ? 600
                        : 500,
                      textTransform: "capitalize",
                    }}
                    textAlign="center"
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: "1rem",
            }}
          >
            {mainPages.map((page) => (
              <Button
                aria-label={page.name}
                key={page.route}
                onClick={() => handleNavLinkClick(page.route)}
                sx={{
                  my: 2,
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: isPathMatch(currentPath, page.route) ? 600 : 500,
                  textTransform: "capitalize",
                  paddingX: "0 !important",
                  marginInlineEnd: 2,
                  color: theme.palette.primary.main,
                  // color: "#fff",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
