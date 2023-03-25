import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "@/src/firebase/clientApp";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERROR } from "@/src/firebase/error";

export const Login: React.FC = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const setAuthState = useSetRecoilState(authModalState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = formValue;
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder="Email"
        name="email"
        type={"email"}
        mb={2}
        required
        focusBorderColor="rgb(182, 244, 146)"
        onChange={handleChange}
      />
      <Input
        placeholder="Password"
        name="password"
        type={"password"}
        required
        mb={"2"}
        focusBorderColor="rgb(182, 244, 146)"
        onChange={handleChange}
      />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        paddingY={"3"}
      >
        {error && (
          <Text color={"red.700"} fontSize={"sm"} pb={"2"}>
            {FIREBASE_ERROR[error.message as keyof typeof FIREBASE_ERROR]}
          </Text>
        )}

        <Button type="submit" width={"80%"} isLoading={loading}>
          Login
        </Button>
      </Flex>
      <Flex dir="row" justify={"center"} align={"center"}>
        <Text fontSize={"sm"} pr={"2"}>
          No account?
        </Text>
        <Text
          color={"rgb(51, 139, 147)"}
          onClick={() =>
            setAuthState((prev) => ({
              ...prev,
              view: "sign up",
            }))
          }
          _hover={{
            cursor: "pointer",
          }}
        >
          SIGN UP
        </Text>
      </Flex>
      <Text
        textAlign={"center"}
        onClick={() => {
          setAuthState((prev) => ({
            ...prev,
            view: "reset password",
          }));
        }}
        _hover={{
          cursor: "pointer",
          color: "whatsapp.600",
        }}
      >
        Reset password
      </Text>
    </form>
  );
};
