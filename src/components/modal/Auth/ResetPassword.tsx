import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useState } from "react";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { useSetRecoilState } from "recoil";

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState("tre");
  const setAuth = useSetRecoilState(authModalState);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  // ! add the actionCodeSettings = {url:" your email goes here"}
  const HandleReset = async () => {
    const success = await sendPasswordResetEmail(email);
    if (success) {
      setEmailSending("mail sent check your email");
      return;
    } else if (error) {
      setEmailSending(error.message);
      return;
    }
  };
  return (
    <Flex
      flexDir={"column"}
      align={"center"}
      justify={"space-between"}
      color={"brand.100"}
    >
      {emailSending == "" && (
        <>
          <Input
            placeholder="Email"
            type={email}
            onChange={handleChange}
            borderColor={"brand.500"}
            focusBorderColor={"brand.500"}
          />
          <Text textAlign={"center"} fontSize={"xs"} color={"whatsapp.500"}>
            Enter the Email associated with your account, and we would send you
            a reset link
          </Text>
        </>
      )}

      {emailSending.length > 2 && (
        <Text color={"brand.500"}>{emailSending}</Text>
      )}

      <Button
        w={"50%"}
        isLoading={sending}
        onClick={HandleReset}
        isDisabled={emailSending ? true : false}
      >
        Reset
      </Button>
      <Flex width={"100%"} justify={"space-evenly"}>
        <Text
          onClick={() => {
            setAuth((prev) => ({
              ...prev,
              view: "log in",
            }));
          }}
          _hover={{
            cursor: "pointer",
            color: "brand.500",
          }}
          mr={"10"}
        >
          Login
        </Text>
        <Text
          onClick={() => {
            setAuth((prev) => ({
              ...prev,
              view: "sign up",
            }));
          }}
          _hover={{
            cursor: "pointer",
            color: "brand.500",
          }}
        >
          Signup
        </Text>
      </Flex>
    </Flex>
  );
};
