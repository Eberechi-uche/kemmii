import { Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";
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
import { defaultSPaceListMenuItem } from "@/src/Atoms/spaceListMenuAtom";

export const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const { spaceValue } = useSpaceDataFetch();
  const { toggleSpaceListMenu, spaceListState, onSpaceSelect } =
    useSpaceListState();

  return (
    <Flex bg="white" height="50px" padding="10px 12px" alignItems="center">
      <Flex
        cursor={"pointer"}
        onClick={() => {
          onSpaceSelect(defaultSPaceListMenuItem);
        }}
      >
        <Image src="/nav-logo.svg" height="25px" padding="0 3px 0 0" />
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
          <Menu isOpen={spaceListState.isOpen}>
            <MenuButton px={"2"} pt={"2"} onClick={toggleSpaceListMenu}>
              <Icon as={MdWorkspacesFilled} fontSize={"15px"} />
            </MenuButton>
            <Flex
              align={"center"}
              cursor={"pointer"}
              border={"0.5px solid"}
              borderRadius={"full"}
              px={"2"}
              py={"1px"}
              width={"-moz-fit-content"}
              mt={"1"}
            >
              {spaceListState.selectedSpace.imageUrl ? (
                <Image
                  src={spaceListState.selectedSpace.imageUrl}
                  objectFit={"fill"}
                  width={"15px"}
                  height={"15px"}
                  borderRadius={"full"}
                />
              ) : (
                <Icon as={RiUserSmileFill} width={"15px"} />
              )}
              <Text ml={"1"} fontSize={"xx-small"} fontWeight={"extrabold"}>
                {spaceListState.selectedSpace.displayText}
              </Text>
            </Flex>
            <MenuList fontSize={{ base: "xs", md: "sm" }}>
              <MenuItem fontWeight={"extrabold"}> my spaces</MenuItem>
              {spaceValue.mySpaces
                .filter((space) => space.isModerator)
                .map((space) => (
                  <SpaceList
                    spaceSnippet={space}
                    key={space.spaceId}
                    link={`/spaces/${space.spaceId}`}
                    displayText={`${space.spaceId}`}
                    imageUrl={`${space.imageUrl}`}
                  />
                ))}
              <CreateSpace />
              <MenuItem fontWeight={"extrabold"}> Joined spaces</MenuItem>
              {spaceValue.mySpaces
                .filter((space) => !space.isModerator)
                .map((space) => (
                  <SpaceList
                    key={space.spaceId}
                    imageUrl={space.imageUrl}
                    spaceSnippet={space}
                    link={`/spaces/${space.spaceId}`}
                    displayText={`${space.spaceId}`}
                  />
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
