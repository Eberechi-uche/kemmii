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
import React from "react";
import { AuthInputs } from "./AuthInputs";
import { OAuthButtons } from "./OAuthButtons";

export const AuthModal: React.FC = () => {
  const [modalState, setmodalState] = useRecoilState(authModalState);

  const handleClick = () => {
    setmodalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

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
          >
            <Flex
              align={"center"}
              justify={"center"}
              direction={"column"}
              width={"70%"}
            >
              <OAuthButtons />
              <Text m={"2"}> Or</Text>
              <AuthInputs />
              {/* <ResetPassword/> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
