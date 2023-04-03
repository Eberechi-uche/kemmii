import { auth } from "@/src/firebase/clientApp";
import { AddIcon } from "@chakra-ui/icons";

import { BiLogOut } from "react-icons/bi";
import { GrBraille } from "react-icons/gr";
import { GiCyborgFace } from "react-icons/gi";

import { AiFillSmile } from "react-icons/ai";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const UserMenu: React.FC = () => {
  const [user] = useAuthState(auth);
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <Menu>
      <MenuButton>
        <Flex justify={"center"} align={"center"} flexGrow={"1"}>
          <Text px={"5"} isTruncated>
            hello {user?.email?.split("@")[0]}
          </Text>
          <Icon as={GrBraille} fontSize={"30px"} ml="2" color={"brand.700"} />
        </Flex>
      </MenuButton>
      <MenuList zIndex={"4"}>
        <MenuItem minH="48px">
          <Icon as={AiFillSmile} fontSize={"30px"} ml="2" color={"brand.700"} />
          <Text ml={"2"}>{user?.email} </Text>
          <span></span>
        </MenuItem>
        <MenuItem icon={<AddIcon />}>create post</MenuItem>
        <MenuItem icon={<GiCyborgFace />}> add NFT</MenuItem>

        <MenuItem onClick={logout} icon={<BiLogOut />}>
          sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
