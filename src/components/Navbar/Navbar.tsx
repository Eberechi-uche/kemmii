import { Flex, Image, Spacer, Text } from "@chakra-ui/react";
import SearchInput from "./SearchInput/SearchInput.component";
import NavContentRight from "./NavBarRightContent/NavContentRight";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";

export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex bg="white" height="50px" padding="10px 12px" alignItems="center">
      <Flex>
        <Image
          src="images/svg/nav-logo.svg"
          height="25px"
          padding="0 3px 0 0"
        ></Image>
        <Text
          bgGradient="linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
          bgClip="text"
          display={{ base: "none", md: "unset" }}
          as="b"
        >
          Kemmii
        </Text>
      </Flex>
      <SearchInput />
      <NavContentRight user={user} />
    </Flex>
  );
};
