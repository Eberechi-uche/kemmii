import { SpaceListMenuState } from "@/src/Atoms/spaceListMenuAtom";
import { SpaceState } from "@/src/Atoms/spacesAtom";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Icon,
  Image,
  Flex,
  Text,
  Divider,
  List,
} from "@chakra-ui/react";

import { RiUserSmileFill } from "react-icons/ri";
import { useSpaceListState } from "../Hooks/useSpaceListState";
import { SpaceList } from "../Spaces.component.tsx/SpaceList";
import { CreateSpace } from "./NavBarRightContent/userActions/CreateSpace";
type SideDrawerProp = {
  spaceValue: SpaceState;
  spaceListState: SpaceListMenuState;
  close: () => void;
};
export const SideDrawer: React.FC<SideDrawerProp> = ({
  spaceListState,
  spaceValue,
  close,
}) => {
  return (
    <>
      <Drawer isOpen={spaceListState.isOpen} placement="left" onClose={close}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            justifyContent={"space-evenly"}
          >
            <Text> your spaces</Text>
            <Flex
              align={"center"}
              cursor={"pointer"}
              border={"0.5px solid"}
              borderRadius={"full"}
              px={"2"}
              py={"1px"}
              maxW={"70px"}
              mt={"1"}
              fontSize={"small"}
            >
              {spaceListState.selectedSpace.imageUrl ? (
                <Image
                  src={spaceListState.selectedSpace.imageUrl}
                  objectFit={"cover"}
                  width={"15px"}
                  height={"15px"}
                  borderRadius={"full"}
                  alt={"spaces icons"}
                />
              ) : (
                <Icon as={RiUserSmileFill} width={"15px"} />
              )}
              <Text ml={"1"} fontWeight={"extrabold"} isTruncated>
                {spaceListState.selectedSpace.displayText}
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <List>
              {spaceValue.mySpaces
                .filter((space) => space.isModerator)
                .map((space) => (
                  <SpaceList
                    key={space.spaceId}
                    link={`/spaces/${space.spaceId}`}
                    displayText={`${space.spaceId}`}
                    imageUrl={`${space.imageUrl}`}
                  />
                ))}
            </List>
            <List>
              <Divider
                color={"brand.700"}
                my="10px"
                colorScheme={"brand.500"}
              />
              <CreateSpace />
              <Divider
                color={"brand.700"}
                my="10px"
                colorScheme={"brand.500"}
              />
            </List>
            <List>
              {spaceValue.mySpaces
                .filter((space) => !space.isModerator)
                .map((space) => (
                  <SpaceList
                    key={space.spaceId}
                    imageUrl={space.imageUrl!}
                    link={`/spaces/${space.spaceId}`}
                    displayText={`${space.spaceId}`}
                  />
                ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
