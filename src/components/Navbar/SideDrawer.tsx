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
import Link from "next/link";

import { RiUserSmileFill } from "react-icons/ri";
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
            justifyContent={"space-between"}
            mt={"20"}
          >
            <Link
              href={`/`}
              onClick={() => {
                close();
              }}
            >
              <Image src="/yellow.ico" height="25px" alt={"logo"} />
            </Link>

            <Text fontWeight={"500"}> your spaces</Text>
          </DrawerHeader>
          <Flex
            align={"center"}
            cursor={"pointer"}
            border={"0.5px solid"}
            borderRadius={"full"}
            px={"2"}
            width={"fit-content"}
            py={"1px"}
            mt={"1"}
            fontSize={"small"}
            ml={"15"}
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

          <DrawerBody>
            <List>
              {spaceValue.mySpaces
                .filter((space) => space.isModerator)
                .map((space) => (
                  <Link
                    href={`/spaces/${space.spaceId}`}
                    key={space.spaceId}
                    onClick={() => {
                      close();
                    }}
                  >
                    <SpaceList
                      key={space.spaceId}
                      link={`/spaces/${space.spaceId}`}
                      displayText={`${space.spaceId}`}
                      imageUrl={`${space.imageUrl}`}
                    />
                    <Divider my={"2"} />
                  </Link>
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
                  <Link
                    href={`/spaces/${space.spaceId}`}
                    key={space.spaceId}
                    onClick={() => {
                      close();
                    }}
                  >
                    <SpaceList
                      key={space.spaceId}
                      imageUrl={space.imageUrl!}
                      link={`/spaces/${space.spaceId}`}
                      displayText={`${space.spaceId}`}
                    />
                    <Divider my={"2"} />
                  </Link>
                ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
