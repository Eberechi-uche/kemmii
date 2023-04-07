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
  Image,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthModal } from "../../modal/Auth/AuthModal";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { useRouter } from "next/router";
import { useSpaceListState } from "../../Hooks/useSpaceListState";

export const UserMenu: React.FC = () => {
  const setAuthModalView = useSetRecoilState(authModalState);
  const { toggleSpaceListMenu } = useSpaceListState();
  const [user] = useAuthState(auth);
  const route = useRouter();
  const logout = async () => {
    await signOut(auth);
  };
  const handleProfileClick = () => {
    setAuthModalView({
      view: "profile",
      open: true,
    });
  };
  const handleCreatePost = () => {
    const { spaceid } = route.query;

    if (!user) {
      setAuthModalView((prev) => ({
        open: true,
        view: "log in",
      }));
      return;
    }
    if (spaceid) {
      route.push(`/spaces/${spaceid}/submit`);
      return;
    }
    toggleSpaceListMenu();
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
      <MenuList zIndex={"9"} fontSize={"md"}>
        <MenuItem minH="48px" onClick={handleProfileClick}>
          <Image
            src={user?.photoURL ? `${user.photoURL}` : "images/default.png"}
            alt={user?.uid}
            boxSize={"70px"}
          />
          <Text ml={"2"}>{user?.displayName} </Text>
          <span></span>
        </MenuItem>
        <MenuItem icon={<AddIcon />} onClick={handleCreatePost}>
          create post
        </MenuItem>
        <MenuItem icon={<GiCyborgFace />}> add NFT</MenuItem>

        <MenuItem onClick={logout} icon={<BiLogOut />}>
          sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
