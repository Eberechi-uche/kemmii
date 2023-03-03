import { useRecoilState } from "recoil";
import { authModalState } from "../../../Atoms/AuthModalAtom";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AuthInputs } from "./AuthInputs";
import { OAuthButtons } from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { ResetPassword } from "./ResetPassword";

export const AuthModal: React.FC = () => {
  const [modalState, setmodalState] = useRecoilState(authModalState);
  const [user] = useAuthState(auth);

  const handleClick = () => {
    setmodalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  useEffect(() => {
    if (user) {
      handleClick();
    }
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgGradient={
              " linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
            }
          >
            {modalState.view}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            py={"10"}
          >
            <Flex
              align={"center"}
              justify={"center"}
              direction={"column"}
              width={"70%"}
            >
              {modalState.view !== "reset password" && (
                <>
                  <OAuthButtons />
                  <Text m={"2"}> Or</Text>
                  <AuthInputs />
                </>
              )}
              {modalState.view === "reset password" && <ResetPassword />}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
