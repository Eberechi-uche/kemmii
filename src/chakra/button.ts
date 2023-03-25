import { ComponentStyleConfig } from "@chakra-ui/theme";
export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    m: "2",
  },
  sizes: {
    xs: {
      px: 5,
      py: 3,
    },
    sm: {
      fontSize: "sm",
      px: 10, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 10, // <-- these values are tokens from the design system
      py: 2, // <-- these values are tokens from the design system
    },
  },
  variants: {
    outline: {
      outline: "1px solid",
      outlineColor: "rgb(51, 139, 147)",
      colorScheme: "teal.800",
      color: "teal.500",

      _hover: {
        bg: "rgb(51, 139, 147)",
        color: "white",
      },
      _active: {
        bg: "rgb(51, 139, 147)",
      },
    },
    solid: {
      bg: "rgb(51, 139, 147)",
      color: "white",
      colorScheme: "teal.800",
      _hover: {
        bg: "none",
        outline: "1px solid",
        outlineColor: "rgb(51, 139, 147)",
        color: "teal.500",
      },
      _active: {
        bg: "rgb(51, 139, 147)",
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
