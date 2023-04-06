import { ComponentStyleConfig } from "@chakra-ui/theme";
export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    m: "2",
  },
  sizes: {
    xs: {
      fontSize: "xs",
      px: 5,
      py: 2,
      fontWeight: "400",
    },
    sm: {
      fontSize: "xs",
      px: 3, // <-- px is short for paddingLeft and paddingRight
      py: 2, // <-- py is short for paddingTop and paddingBottom
      fontWeight: "400",
    },
    md: {
      fontSize: "md",
      px: 5, // <-- these values are tokens from the design system
      py: 2, // <-- these values are tokens from the design system
      fontWeight: "400",
    },
    icon: {
      px: 3,
      py: 1,
    },
  },
  variants: {
    outline: {
      border: "1px solid",
      borderColor: "#2C5282",
      colorScheme: "#2C5282",
      color: "brand.700",
      outline: "none",

      _hover: {
        bg: "#2C5282",
        color: "white",
      },
      _active: {
        bg: "#2C5282",
      },
    },
    solid: {
      bg: "#2C5282",
      color: "white",
      colorScheme: "#2C5282",
      outline: "none",
      _hover: {
        bg: "none",
        border: "1px solid",
        borderColor: "#2C5282",
        color: "#2C5282",
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
