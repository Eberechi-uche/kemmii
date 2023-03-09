import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useState } from "react";

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailSending, setEmailSending] = useState("");
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
      <Input placeholder="Email" type={email} onChange={handleChange} />
      {emailSending.length > 2 && <Text>{email}</Text>}
      <Button w={"50%"} isLoading={sending}>
        Reset
      </Button>
    </Flex>
  );
};
