import { ComponentStyleConfig } from "@chakra-ui/theme";
export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "70px",
    textTransform: "uppercase",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    // md: {
    //   fontSize: "md",
    //   px: 6, // <-- these values are tokens from the design system
    //   py: 4, // <-- these values are tokens from the design system
    // },
  },
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "rgb(51, 139, 147)",
      color: "teal.800",
      _hover: {
        bg: "rgb(51, 139, 147)",
        color: "white",
      },
    },
    solid: {
      bg: "rgb(51, 139, 147)",
      color: "white",
      _hover: {
        bg: "none",
        border: "2px solid",
        borderColor: "rgb(51, 139, 147)",
        color: "teal.800",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};
export default Button;
