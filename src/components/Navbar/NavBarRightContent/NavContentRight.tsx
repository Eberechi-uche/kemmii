import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { AuthModal } from "../../modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";

type NavContentRightProps = {
  user: any;
};

const NavContentRight: React.FC<NavContentRightProps> = ({ user }) => {
  return (
    <Flex>
      {user ? (
        <Button
          onClick={() => {
            signOut(auth);
          }}
        >
          {" "}
          sign Out
        </Button>
      ) : (
        <AuthButtons />
      )}
      <AuthModal />
    </Flex>
  );
};
export default NavContentRight;
