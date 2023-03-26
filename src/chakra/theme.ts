import { extendTheme } from "@chakra-ui/react";
import Button from "./button";
// ! Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "gray.600",
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: () => ({
      "html, body": {
        bg: "gray.200",
        fontSize: { base: "sm", md: "md" },
      },
    }),
  },
  components: {
    Button,
  },
});
export default theme;
