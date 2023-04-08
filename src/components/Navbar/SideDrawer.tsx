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
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  DrawerFooter,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { SpaceList } from "../Spaces.component.tsx/SpaceList";
import { CreateSpace } from "./NavBarRightContent/userActions/CreateSpace";
import { signOut } from "firebase/auth";

type SideDrawerProp = {
  spaceValue: SpaceState;
  isOpen: boolean;
  onClose: () => void;
};
export const SideDrawer: React.FC<SideDrawerProp> = ({
  spaceValue,
  isOpen,
  onClose,
}) => {
  const [user] = useAuthState(auth);
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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
                onClose();
              }}
            >
              <Icon as={AiFillHome} />
            </Link>

            <Text fontWeight={"300"}> home</Text>
          </DrawerHeader>

          <DrawerBody>
            <DropDown title={"Your spaces"}>
              <List>
                {spaceValue.mySpaces
                  .filter((space) => space.isModerator)
                  .map((space) => (
                    <Link
                      href={`/spaces/${space.spaceId}`}
                      key={space.spaceId}
                      onClick={() => {
                        onClose();
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
            </DropDown>

            <DropDown title={"Joined Spaces"}>
              <List>
                {spaceValue.mySpaces
                  .filter((space) => !space.isModerator)
                  .map((space) => (
                    <Link
                      href={`/spaces/${space.spaceId}`}
                      key={space.spaceId}
                      onClick={() => {
                        onClose();
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
            </DropDown>
            <List>
              <CreateSpace />
            </List>
          </DrawerBody>
          <DrawerFooter>
            <Text
              display={"flex"}
              alignItems={"center"}
              width={"100%"}
              onClick={handleSignOut}
            >
              <Icon as={FiLogOut} mr={"2"} />
              Sign out
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
type DropDownProps = {
  children: React.ReactNode;
  title: string;
};
export const DropDown: React.FC<DropDownProps> = ({ children, title }) => {
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "brand.500", color: "white" }}>
              <Box as="span" flex="1" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>{children}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
