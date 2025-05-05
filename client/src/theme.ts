import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
        50: '#f9f9f9',
        100: '#ededed',
        200: '#d3d3d3',
        300: '#b3b3b3',
        400: '#a0a0a0',
        500: '#898989',
        600: '#6c6c6c',
        700: '#202020',
        800: '#121212',
        900: '#111'
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "gray.100",
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
      },
    }),
  },
} as ThemeOverride);
export default theme;
