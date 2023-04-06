import { extendTheme } from "@chakra-ui/react";
import Button from "./button";
// ! Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      50: "#EBF8FF",
      100: "#2C5282",
      200: "#90CDF4",
      500: "#3182CE",
      700: "#2C5282",
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: () => ({
      "html, body": {
        bg: "#EBF8FF",
        fontSize: { base: "sm", md: "md" },
      },
    }),
  },
  components: {
    Button,
  },
});
export default theme;
