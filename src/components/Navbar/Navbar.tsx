import { Flex, Icon, Image, Spacer, Text, Stack } from "@chakra-ui/react";
import SearchInput from "./SearchInput/SearchInput.component";
import NavContentRight from "./NavBarRightContent/NavContentRight";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { BsUiRadiosGrid } from "react-icons/bs";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { CreateSpace } from "./NavBarRightContent/userActions/CreateSpace";
import { CreateSpaceModal } from "../modal/CreateSpace/CreateSpaceModal";
import { useRecoilState } from "recoil";
import { spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { useSpaceDataFetch } from "../Hooks/useSpaceDataFetch";
import { useRouter } from "next/router";
import { SpaceList } from "../Spaces.component.tsx/SpaceList";
export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const route = useRouter();
  const { spaceValue } = useSpaceDataFetch();

  return (
    <Flex bg="white" height="50px" padding="10px 12px" alignItems="center">
      <Flex>
        <Image src="/nav-logo.svg" height="25px" padding="0 3px 0 0"></Image>
        <Text
          bgGradient="linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))"
          bgClip="text"
          display={{ base: "none", md: "unset" }}
          as="b"
        >
          Kemmii
        </Text>
      </Flex>
      {user && (
        <>
          <Menu>
            <MenuButton px={"5"} pt={"1"}>
              <Icon as={BsUiRadiosGrid}></Icon>
            </MenuButton>

            <MenuList fontSize={{ base: "xs", md: "sm" }} p={"2"}>
              <Text fontWeight={"extrabold"}> my spaces</Text>
              {spaceValue.mySpaces
                .filter((space) => space.isModerator)
                .map((space) => (
                  <SpaceList spaceSnippet={space} key={space.spaceId} />
                ))}
              <CreateSpace />
              <Text fontWeight={"extrabold"}> Joined spaces</Text>
              {spaceValue.mySpaces
                .filter((space) => !space.isModerator)
                .map((space) => (
                  <SpaceList key={space.spaceId} spaceSnippet={space} />
                ))}
            </MenuList>
          </Menu>
        </>
      )}
      <Spacer />
      <SearchInput />
      <Spacer />
      <NavContentRight user={user} />
    </Flex>
  );
};
