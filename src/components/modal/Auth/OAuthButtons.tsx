import { Button, Image } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useEffect } from "react";

export const OAuthButtons = () => {
  const [signInWithGoogle, userData, loading, error] =
    useSignInWithGoogle(auth);

  const creatUser = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };
  useEffect(() => {
    if (userData) {
      creatUser(userData.user);
    }
  }, [userData]);
  return (
    <Button
      variant={"outline"}
      fontSize={"10"}
      my={"5"}
      outlineColor={" #b21f1f"}
      color={"red.600"}
      _hover={{
        bg: "#b21f1f",
        color: "#fff",
      }}
      isLoading={loading}
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <Image src="/images/google.png" width={"20px"} m={"2"} />
      Login with google
    </Button>
  );
};
