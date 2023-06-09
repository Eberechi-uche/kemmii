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
  Slide,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AuthInputs } from "./AuthInputs";
import { OAuthButtons } from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { ResetPassword } from "./ResetPassword";
import { UserProfile } from "../../UserProfile/UserProfile";

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
      <Modal
        isOpen={modalState.open}
        onClose={handleClick}
        motionPreset="slideInBottom"
        size={{ base: "full", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bgGradient={
              "radial-gradient(circle at 10% 20%, rgb(149, 219, 254) 0%, rgb(7, 134, 197) 90.1%)"
            }
            color={"white"}
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
              {modalState.view !== "profile" &&
                modalState.view !== "reset password" && (
                  <>
                    <OAuthButtons />
                    <Text m={"2"}> Or</Text>
                    <AuthInputs />
                  </>
                )}
              {modalState.view === "reset password" && <ResetPassword />}
            </Flex>
            {modalState.view === "profile" && <UserProfile />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
