import { Button } from "@chakra-ui/react";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import React from "react";
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
  const setmodalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        height={"28px"}
        width={{ base: " 50px", sm: "70px", md: "120px" }}
        onClick={() => {
          setmodalState(() => ({
            open: true,
            view: "log in",
          }));
        }}
      >
        Login In
      </Button>
      <Button
        variant={"outline"}
        height={"28px"}
        display={{ base: "none", sm: "flex" }}
        width={{ sm: "70px", md: "120px" }}
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
