import { Space, SpaceSnippet, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { auth } from "@/src/firebase/clientApp";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiUserSmileFill } from "react-icons/ri";
import { useRecoilValue } from "recoil";
import { BsPeople } from "react-icons/bs";
import { TfiSharethis } from "react-icons/tfi";
import { useSpaceDataFetch } from "../Hooks/useSpaceDataFetch";

type HeaderProps = {
  spacesData: Space;
};

export const Header: React.FC<HeaderProps> = ({ spacesData }) => {
  const { spaceValue, onSpaceJoinOrLeave, loading } = useSpaceDataFetch();

  let isMember: boolean = !!spaceValue.mySpaces.find(
    (space) => space.spaceId === spacesData.id
  );

  return (
    <>
      <Flex
        direction={"column"}
        width={"100%"}
        height={"min-content"}
        bg={"brand.500"}
        justify={"center"}
        align={"center"}
        position={"relative"}
      >
        <Box height={"80px"} bg={"green"}></Box>
        <Image
          alt={spacesData.id}
          boxSize={"60px"}
          objectFit={"fill"}
          borderRadius={"full"}
          src={spaceValue.currentSpace?.imageUrl}
          position={"absolute"}
          top={"50px"}
        />
        <Flex width={"100%"} justify={"center"} bg={"brand.50"} pt={"8"}>
          <Flex
            width={"60%"}
            flexDir={"column"}
            justify={"center"}
            align={"center"}
            alignSelf={"center"}
            textAlign={"center"}
            height={"fit-content"}
          >
            <Text fontWeight={"800"} fontSize={"x-large"}>
              {spaceValue.currentSpace?.id}
            </Text>
            <Text fontSize={"sm"} noOfLines={[4, 5]}>
              this is where the group details would go in sdhsdbhksdkb
            </Text>

            <Text
              fontSize={{ base: "x-small", md: "small" }}
              display={"flex"}
              alignItems={"center"}
            >
              <Icon as={BsPeople} mr={"1"} />
              {spaceValue.currentSpace?.numberOfMembers} members
            </Text>
            <Flex
              width={{ base: "80%", md: "30%" }}
              justify={"space-between"}
              align={"center"}
              alignSelf={"center"}
              px={"3"}
            >
              <Icon as={TfiSharethis}> share Space</Icon>
              <Button
                size={{ base: "sm", md: "sm" }}
                variant={isMember ? "outline" : "solid"}
                isLoading={loading}
                onClick={() => {
                  onSpaceJoinOrLeave(spacesData, isMember);
                }}
                width={"fit-content"}
              >
                {isMember ? "joined" : "join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
