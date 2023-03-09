import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { AuthModal } from "../../modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { signOut, User } from "firebase/auth";
import { auth } from "@/src/firebase/clientApp";
import { UserMenu } from "./UserMenu";

type NavContentRightProps = {
  user?: User | null;
};

const NavContentRight: React.FC<NavContentRightProps> = ({ user }) => {
  return (
    <Flex>
      {user ? <UserMenu /> : <AuthButtons />}
      <AuthModal />
    </Flex>
  );
};
export default NavContentRight;
