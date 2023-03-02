import { Flex } from "@chakra-ui/react";
import React from "react";
import { AuthModal } from "../../modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

type NavContentRightProps = {
  // user: any;
};

const NavContentRight: React.FC<NavContentRightProps> = () => {
  return (
    <Flex>
      <AuthModal />
      <AuthButtons />
    </Flex>
  );
};
export default NavContentRight;
