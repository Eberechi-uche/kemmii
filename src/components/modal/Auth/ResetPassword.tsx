import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useState } from "react";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { useSetRecoilState } from "recoil";

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState("");
  const setAuth = useSetRecoilState(authModalState);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  // ! add the actionCodeSettings = {url:" your email goes here"}
  // const HandleReset = async () => {
  //   const success = await sendPasswordResetEmail(email, actionCodeSettings);
  //   if (success) {
  //     setEmailSending("mail sent check your email");
  //     return;
  //   } else if (error) {
  //     setEmailSending(error.message);
  //     return;
  //   }
  // };
  return (
    <Flex flexDir={"column"} align={"center"} justify={"space-between"}>
      {emailSending == "" && (
        <>
          <Input
            placeholder="Email"
            type={email}
            onChange={handleChange}
            borderColor={"whatsapp.600"}
            focusBorderColor={"whatsapp.600"}
          />
          <Text textAlign={"center"} fontSize={"xs"} color={"whatsapp.500"}>
            Enter the Email associated with your account, and we would send you
            a reset link
          </Text>
        </>
      )}

      {emailSending.length > 2 && (
        <Text color={"whatsapp.600"}>{emailSending}</Text>
      )}

      <Button w={"50%"} isLoading={sending}>
        Reset
      </Button>
      <Flex width={"50%"} justify={"space-evenly"} color={"whatsapp.200"}>
        <Text
          onClick={() => {
            setAuth((prev) => ({
              ...prev,
              view: "log in",
            }));
          }}
          _hover={{
            cursor: "pointer",
            color: "whatsapp.600",
          }}
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
            color: "whatsapp.600",
          }}
        >
          Signup
        </Text>
      </Flex>
    </Flex>
  );
};
