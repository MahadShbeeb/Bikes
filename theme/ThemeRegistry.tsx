import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Cairo } from "next/font/google";
import { createTheme, Theme } from "@mui/material/styles";
import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  ReactElement,
  useMemo,
} from "react";
import { NextAppDirEmotionCacheProvider } from "./EmotionCashe";

const cairo = Cairo({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin", "arabic"],
});
const lightTheme: Theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: cairo.style.fontFamily,
  },
  components: {
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: "#FFF",
      paper: "#E6E9EE",
    },
    primary: {
      main: "#2A3C49",
      light: "#e5e4df",
      dark: "#61AEB0",
      contrastText: "#9E9E9E",
    },
    secondary: {
      main: "#92CFD8",
      light: "#F0F2F5",
    },
    text: {
      primary: "#333",
      secondary: "#FFF",
    },
    warning: {
      main: "#907137",
    },
    info: {
      main: "#022352",
      light: "#00315C",
    },
    success: {
      main: "#077065",
    },
    error: {
      main: "#FF204E",
    },
  },
});

const darkTheme: Theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: cairo.style.fontFamily,
  },
  palette: {
    mode: "dark",
    background: {
      default: "#171717",
      paper: "#333",
    },
    primary: {
      main: "#2A3C49",
      contrastText: "#9E9E9E",
    },
    text: {
      primary: "#FFF",
      secondary: "#171717",
    },
    secondary: {
      main: "#92CFD8",
    },
    warning: {
      main: "#B58E44",
    },
    info: {
      main: "#9CB9BC",
    },
    success: {
      main: "#3498DB",
    },
    error: {
      main: "#FF204E",
    },
  },
  components: {
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
});

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};

interface ThemeRegistryProps {
  options: {
    key: string;
    prepend?: boolean;
  };
  children: ReactNode;
}

export default function ThemeRegistry(props: ThemeRegistryProps): ReactElement {
  const { children } = props;

  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => {
    const baseTheme = isDarkMode ? darkTheme : lightTheme;

    return createTheme({
      ...baseTheme,
    });
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => {
      const newMode = !prevDarkMode;
      return newMode;
    });
  };

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
          <CssBaseline />
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
