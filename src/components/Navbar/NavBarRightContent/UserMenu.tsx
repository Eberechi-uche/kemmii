import { auth } from "@/src/firebase/clientApp";
import { AddIcon } from "@chakra-ui/icons";

import { BiLogOut } from "react-icons/bi";
import { GrBraille } from "react-icons/gr";
import { GiCyborgFace } from "react-icons/Gi";
import { CreateSpace } from "./userActions/CreateSpace";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useResetRecoilState } from "recoil";
import { spaceStateAtom } from "@/src/Atoms/spacesAtom";

export const UserMenu: React.FC = () => {
  const [user] = useAuthState(auth);
  const ResetSpace = useResetRecoilState(spaceStateAtom);
  const logout = async () => {
    await signOut(auth);
    ResetSpace();
  };
  return (
    <Menu>
      <MenuButton>
        <Flex justify={"center"} align={"center"} flexGrow={"1"}>
          <Text px={"5"} fontSize={{ base: "xs", md: "md" }} isTruncated>
            hafa! {user?.email?.split("@")[0]}
          </Text>
          <Icon as={GrBraille}></Icon>
        </Flex>
      </MenuButton>
      <MenuList fontSize={{ base: "xs", md: "md" }}>
        <MenuItem minH="48px">
          <Image
            boxSize="2rem"
            borderRadius="full"
            src={"https://bit.ly/3JNT4Su"}
            alt="Fluffybuns the destroyer"
            mr="12px"
          />
          <Text>{user?.email} </Text>
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
