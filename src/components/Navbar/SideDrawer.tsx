import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
} from "@chakra-ui/react";
import { CreateSpace } from "./NavBarRightContent/userActions/CreateSpace";
type SideDrawerProp = {
  active: boolean;
  open: () => void;
};
export const SideDrawer: React.FC<SideDrawerProp> = ({ active, open }) => {
  return (
    <>
      <Button colorScheme="teal" onClick={open}>
        Open
      </Button>
      <Drawer isOpen={active} placement="left" onClose={open}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <CreateSpace />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
