import {
  Flex,
  Icon,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import NavContentRight from "./NavBarRightContent/NavContentRight";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { SlMenu } from "react-icons/sl";
import { useSpaceDataFetch } from "../Hooks/useSpaceDataFetch";
import { SideDrawer } from "./SideDrawer";
import SearchInput from "./SearchInput/SearchInput.component";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { spaceValue } = useSpaceDataFetch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex bg="white" height="50px" padding="10px 12px" alignItems="center">
      {!user && (
        <Link href={"/"}>
          <Flex cursor={"pointer"}>
            <Image src="/yellow.ico" height="25px" alt={"logo"} />
            <Text
              bgGradient="linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
              bgClip="text"
              display={{ base: "none", md: "unset" }}
              as="b"
            >
              emmii
            </Text>
          </Flex>
        </Link>
      )}

      {user && (
        <>
          <Icon
            as={SlMenu}
            fontSize={"30px"}
            ml="2"
            color={"brand.700"}
            onClick={onOpen}
          />
          <SideDrawer
            onClose={onClose}
            isOpen={isOpen}
            spaceValue={spaceValue}
          />
        </>
      )}
      <Spacer />

      {/* <SearchInput /> */}
      <Spacer />
      <NavContentRight user={user} />
    </Flex>
  );
};
