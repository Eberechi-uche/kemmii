import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AuthModal } from "../../modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import { User } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/Atoms/AuthModalAtom";

// import { UserMenu } from "./UserMenu";

type NavContentRightProps = {
  user?: User | null;
};

const NavContentRight: React.FC<NavContentRightProps> = ({ user }) => {
  const setAuthModalView = useSetRecoilState(authModalState);
  const handleProfileClick = () => {
    setAuthModalView({
      view: "profile",
      open: true,
    });
  };
  return (
    <Flex>
      {user ? (
        <Flex align={"center"} onClick={handleProfileClick} cursor={"pointer"}>
          <Text mr={"2"}> {user.displayName}</Text>
          <Image
            src={user?.photoURL ? `${user.photoURL}` : "images/default.png"}
            alt={user?.uid}
            boxSize={"40px"}
            borderRadius={"full"}
          />
        </Flex>
      ) : (
        <AuthButtons />
      )}
      <AuthModal />
    </Flex>
  );
};
export default NavContentRight;
