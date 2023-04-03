import { Button, Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";

import SearchInput from "./SearchInput/SearchInput.component";
import NavContentRight from "./NavBarRightContent/NavContentRight";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { MdWorkspacesFilled } from "react-icons/md";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CreateSpace } from "./NavBarRightContent/userActions/CreateSpace";
import { useSpaceDataFetch } from "../Hooks/useSpaceDataFetch";
import { SpaceList } from "../Spaces.component.tsx/SpaceList";
import { useSpaceListState } from "../Hooks/useSpaceListState";
import { RiUserSmileFill } from "react-icons/ri";
import {
  defaultSPaceListMenuItem,
  defaultSpaceListMenuState,
} from "@/src/Atoms/spaceListMenuAtom";
import { useRouter } from "next/router";
import { SideDrawer } from "./SideDrawer";
import { useRef } from "react";

export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { spaceValue } = useSpaceDataFetch();

  const route = useRouter();
  const {
    toggleSpaceListMenu,
    spaceListState,
    setSpaceListState,
    onSpaceSelect,
  } = useSpaceListState();
  const handleHomeIconClick = () => {
    onSpaceSelect(defaultSPaceListMenuItem);
  };

  return (
    <Flex bg="white" height="50px" padding="10px 12px" alignItems="center">
      <Flex cursor={"pointer"} onClick={handleHomeIconClick}>
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
      {user && (
        <>
          <Icon
            as={MdWorkspacesFilled}
            fontSize={"30px"}
            ml="2"
            color={"brand.700"}
            onClick={() => {
              toggleSpaceListMenu();
            }}
          />
          <SideDrawer
            spaceListState={spaceListState}
            spaceValue={spaceValue}
            close={toggleSpaceListMenu}
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
function useDisclosure(): { isOpen: any; onOpen: any; onClose: any } {
  throw new Error("Function not implemented.");
}
