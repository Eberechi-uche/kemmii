import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/src/firebase/clientApp";
import { FIREBASE_ERROR } from "@/src/firebase/error";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export const SignUp = () => {
  const [userError, setUserError] = useState("");
  const [signUpData, setSignUpdate] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setAuthState = useSetRecoilState(authModalState);

  const [createUserWithEmailAndPassword, userDetails, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpdate((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword, email } = signUpData;
    if (password !== confirmPassword) {
      setUserError("! Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(email, password);
  };

  const createUser = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };
  useEffect(() => {
    if (userDetails) {
      createUser(userDetails.user);
      setAuthState((prev) => ({
        ...prev,
        open: false,
      }));
    }
  }, [userDetails]);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"email"}
        name="email"
        placeholder="Email"
        mb={"2"}
        onChange={handleFormChange}
        required
        focusBorderColor="brand.50"
        size={"lg"}
      />
      <Input
        type={"password"}
        name="password"
        placeholder="password"
        mb={"2"}
        onChange={handleFormChange}
        required
        focusBorderColor="brand.50"
        size={"lg"}
      />
      <Input
        type={"password"}
        name="confirmPassword"
        placeholder="confirm password"
        mb={"2"}
        onChange={handleFormChange}
        required
        focusBorderColor="brand.50"
        size={"lg"}
      />
      {userError ||
        (error && (
          <Text textAlign={"center"} color={"red.800"} fontSize={"10pt"}>
            {userError ||
              FIREBASE_ERROR[error.message as keyof typeof FIREBASE_ERROR]}
          </Text>
        ))}

      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        paddingY={"3"}
      >
        <Button type="submit" width={"80%"} isLoading={loading}>
          Sign up
        </Button>
      </Flex>
      <Flex dir="row" justify={"center"} align={"center"}>
        <Text fontSize={"sm"} pr={"2"}>
          already have an account?
        </Text>
        <Text
          color={"rgb(51, 139, 147)"}
          _hover={{
            cursor: "pointer",
          }}
          onClick={() =>
            setAuthState((prev) => ({
              ...prev,
              view: "log in",
            }))
          }
        >
          LOGIN
        </Text>
      </Flex>
    </form>
  );
};
