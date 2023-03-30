import { Space, SpaceSnippet, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { auth } from "@/src/firebase/clientApp";
import { Flex, Box, Image, Text, Button, Icon } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GiJasonMask } from "react-icons/Gi";
import { useRecoilValue } from "recoil";
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
      <Flex direction={"column"} width={"100%"} height={"130px"}>
        <Box height={"50%"} width={"100%"} bg={"whatsapp.400"} />
        <Flex width={"100%"} bg={"white"} flexGrow={"1"} justify={"center"}>
          <Flex width={"70%"} maxWidth={"760px"} justify={"space-between"}>
            <Box display={"flex"}>
              {spacesData.imageUrl ? (
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src={spacesData.imageUrl}
                  alt="emike"
                  borderRadius={"5px"}
                  border={"2px solid white"}
                  position={"relative"}
                  top={"-3"}
                />
              ) : (
                <Icon as={GiJasonMask} width={"40px"} height={"40px"} />
              )}

              <Flex direction={"column"}>
                <Text ml={"3"} fontWeight={"extrabold"}>
                  {spacesData.id}
                </Text>
              </Flex>
            </Box>

            <Button
              variant={isMember ? "outline" : "solid"}
              size={"xs"}
              onClick={() => {
                onSpaceJoinOrLeave(spacesData, isMember);
              }}
              isLoading={loading}
            >
              {isMember ? "joined" : "join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
