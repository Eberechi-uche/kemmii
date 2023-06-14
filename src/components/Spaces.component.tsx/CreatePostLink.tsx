import { Flex, Input, Spacer, Image, Text } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";

export const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleClick = () => {
    const { spaceid } = router.query;
    router.push(`/spaces/${spaceid}/submit`);
    return;
  };

  return (
    <>
      <Flex
        width={"100%"}
        bg={"blue.500"}
        py={"2"}
        borderRadius={"4px"}
        pos={"sticky"}
        top={"1"}
        mb={"1"}
        zIndex={4}
        cursor={"pointer"}
        onClick={handleClick}
        color={"white"}
      >
        <Flex
          align={"center"}
          justifyContent={"space-evenly"}
          width={"100%"}
          h={"50px"}
          px={"10px"}
        >
          <Image
            src={user?.photoURL ? user.photoURL : "/images/default.png"}
            alt={"logo"}
            boxSize={"25px"}
            mr={"2"}
            borderRadius={"full"}
          />
          <Input
            bg={"white"}
            borderRadius={"5px"}
            focusBorderColor={"brand.50"}
            maxWidth={"100%"}
            height={"7"}
            isDisabled
            border={"none"}
          />
          <Spacer />
          <Flex justify={"space-around"} flexGrow={"1"} px={"2"} width={"20%"}>
            <Text> Post</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
