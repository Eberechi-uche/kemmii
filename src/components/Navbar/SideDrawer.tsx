import { SpaceListMenuState } from "@/src/Atoms/spaceListMenuAtom";
import { SpaceState } from "@/src/Atoms/spacesAtom";
import { auth } from "@/src/firebase/clientApp";
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
import { useAuthState } from "react-firebase-hooks/auth";

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
  const [user] = useAuthState(auth);
  return (
    <>
      <Drawer isOpen={spaceListState.isOpen} placement="left" onClose={close}>
        <DrawerOverlay />
        <DrawerContent>
          <Flex>
            <Image
              src={user?.photoURL ? `${user.photoURL}` : "images/default.png"}
              alt={user?.uid}
              boxSize={"70px"}
              p={"1"}
            />
            <Flex flexDir={"column"}>
              <Text>{user?.displayName}</Text>
              <Text fontSize={"xs"}>{user?.email}</Text>
            </Flex>
          </Flex>

          <DrawerCloseButton />
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            justifyContent={"space-between"}
            mt={"10"}
          >
            <Link
              href={`/`}
              onClick={() => {
                close();
              }}
            >
              <Image src="/yellow.ico" height="30px" alt={"logo"} />
            </Link>

            <Text fontWeight={"300"}> your spaces</Text>
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
            <Image
              src={spaceListState.selectedSpace.imageUrl}
              objectFit={"cover"}
              width={"15px"}
              height={"15px"}
              borderRadius={"full"}
              alt={"spaces icons"}
            />
            <Text ml={"1"} fontWeight={"extrabold"} isTruncated p={"1"}>
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
