import { Button, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";

export const OAuthButtons = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
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
      isLoading={loading}
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <Image src="images/google.png" width={"20px"} m={"2"} />
      Login with google
    </Button>
  );
};
