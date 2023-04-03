import { ComponentStyleConfig } from "@chakra-ui/theme";
export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
    m: "2",
  },
  sizes: {
    xs: {
      px: 5,
      py: 4,
    },
    sm: {
      fontSize: "sm",
      px: 5, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 7, // <-- these values are tokens from the design system
      py: 5, // <-- these values are tokens from the design system
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
      color: "f.500",
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
      icons: {
        border: "1px solid",
        outline: "none",
        borderColor: "#2C5282",
        colorScheme: "whatsapp.500",
        color: "teal.500",

        _hover: {
          bg: "whatsapp.200",
          color: "white",
        },
      },
      _active: {
        bg: "#2C5282",
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
