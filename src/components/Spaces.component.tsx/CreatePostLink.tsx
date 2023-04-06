import { Flex, Input, Icon, Spacer } from "@chakra-ui/react";
import { BsFillChatSquareDotsFill, BsImage } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { useSpaceListState } from "../Hooks/useSpaceListState";
import { authModalState } from "@/src/Atoms/AuthModalAtom";

export const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const toggleSpaceListMenu = useSpaceListState().toggleSpaceListMenu;
  const setAuthModalView = useSetRecoilState(authModalState);
  const handleClick = () => {
    const { spaceid } = router.query;

    if (!user) {
      setAuthModalView((prev) => ({
        open: true,
        view: "log in",
      }));
      return;
    }
    if (spaceid) {
      router.push(`/spaces/${spaceid}/submit`);
      return;
    }
    toggleSpaceListMenu();
  };

  return (
    <>
      <Flex
        width={"100%"}
        bg={"white"}
        py={"2"}
        borderRadius={"4px"}
        pos={"sticky"}
        top={"1"}
        zIndex={4}
      >
        <Flex
          align={"center"}
          justifyContent={"space-evenly"}
          width={"100%"}
          px={"10px"}
        >
          <Input
            bg={"brand.50"}
            borderRadius={"5px"}
            focusBorderColor={"brand.50"}
            color={"white"}
            maxWidth={"80%"}
            height={"7"}
            borderColor={"none"}
            onClick={handleClick}
            isDisabled
          />
          <Spacer />
          <Flex justify={"space-around"} flexGrow={"1"}>
            <Icon as={BsFillChatSquareDotsFill}></Icon>
            <Icon as={BsImage} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
