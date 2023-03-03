import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { Login } from "./Login";
import { ResetPassword } from "./ResetPassword";
import { SignUp } from "./SignUp";

export const AuthInputs: React.FC = () => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex>
      {modalState.view === "log in" && <Login />}
      {modalState.view === "sign up" && <SignUp></SignUp>}
    </Flex>
  );
};
