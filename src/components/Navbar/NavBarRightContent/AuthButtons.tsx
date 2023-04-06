import { Button, Text } from "@chakra-ui/react";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import React from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setmodalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        size={{ base: "sm" }}
        onClick={() => {
          setmodalState(() => ({
            open: true,
            view: "log in",
          }));
        }}
      >
        login in
      </Button>
      <Button
        size={{ base: "sm" }}
        variant={"outline"}
        display={{ base: "none", sm: "flex" }}
        mr={"2px"}
        onClick={() => {
          setmodalState(() => ({
            open: true,
            view: "sign up",
          }));
        }}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
