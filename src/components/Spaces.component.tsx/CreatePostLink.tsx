import { Flex, Input, Icon, Spacer } from "@chakra-ui/react";
import { BsFillChatSquareDotsFill, BsImage } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/Atoms/AuthModalAtom";

export const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalView = useSetRecoilState(authModalState);
  const handleClick = () => {
    if (!user) {
      setAuthModalView((prev) => ({
        open: true,
        view: "log in",
      }));
      return;
    }
    const { spaceid } = router.query;
    router.push(`/spaces/${spaceid}/submit`);
  };

  return (
    <>
      <Flex width={"100%"} bg={"white"} py={"2"} borderRadius={"4px"}>
        <Flex
          align={"center"}
          justifyContent={"space-evenly"}
          width={"100%"}
          px={"10px"}
        >
          <Input
            bg={"whatsapp.50"}
            borderRadius={"5px"}
            focusBorderColor={"whatsapp.100"}
            color={"white"}
            maxWidth={"80%"}
            height={"7"}
            borderColor={"none"}
            onClick={handleClick}
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
