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
import { TiTime } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import { BsPeople, BsClock } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { TfiSharethis } from "react-icons/tfi";
import { useSpaceDataFetch } from "../Hooks/useSpaceDataFetch";
import moment from "moment";

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
          boxSize={"90px"}
          objectFit={"fill"}
          borderRadius={"full"}
          src={
            spacesData.imageUrl
              ? spacesData.imageUrl
              : "/images/spaceDefault.png"
          }
          position={"absolute"}
          top={"48px"}
          border={"4px solid"}
          borderColor={"brand.500"}
        />
        <Flex
          width={"100%"}
          justify={"center"}
          bg={"brand.50"}
          pt={"30"}
          mt={"6"}
        >
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
            <Flex
              align={"center"}
              fontSize={{ base: "x-small", md: "small" }}
              justify={"space-evenly"}
            >
              <Text
                fontSize={{ base: "x-small", md: "small" }}
                display={"flex"}
                alignItems={"center"}
              >
                <Icon as={BsPeople} mr={"0.5"} />
                {spaceValue.currentSpace?.numberOfMembers} members
              </Text>
              <Icon as={RxDotFilled} />
              <Text display={"flex"} alignItems={"center"}>
                <Icon as={TiTime} mr={"0.5"} />
                created:
                {spaceValue.currentSpace &&
                  moment(new Date(spacesData.createdAt!.seconds * 1000)).format(
                    "MMM DD, YYYY"
                  )}
              </Text>
            </Flex>

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
