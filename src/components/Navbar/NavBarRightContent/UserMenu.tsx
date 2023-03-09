import { auth } from "@/src/firebase/clientApp";
import { AddIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";

export const UserMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem minH="48px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src={"https://cutt.ly/M8X1jj4"}
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <span></span>
        </MenuItem>
        <MenuItem icon={<AddIcon />}>create post</MenuItem>
        <MenuItem> spaces</MenuItem>

        <Button
          onClick={() => {
            signOut(auth);
          }}
        >
          sign Out
        </Button>
      </MenuList>
    </Menu>
  );
};
