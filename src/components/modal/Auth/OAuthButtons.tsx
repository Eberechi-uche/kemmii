import { Button, Image } from "@chakra-ui/react";

export const OAuthButtons = () => {
  return (
    <Button
      variant={"outline"}
      fontSize={"10"}
      my={"5"}
      borderColor={" #b21f1f"}
      _hover={{
        bg: "#b21f1f",
        color: "#fff",
      }}
    >
      <Image src="images/google.png" width={"20px"} m={"2"} />
      Login with google
    </Button>
  );
};
