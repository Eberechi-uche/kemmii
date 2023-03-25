import { Space, SpaceSnippet } from "@/src/Atoms/spacesAtom";
import { Flex, Box, Image, Text, Button } from "@chakra-ui/react";
import { useSpaceDataFetch } from "../Hooks/useSpaceDataFetch";

type HeaderProps = {
  spacesData: Space;
};

export const Header: React.FC<HeaderProps> = ({ spacesData }) => {
  const { spaceValue, onSpaceJoinOrLeave, loading } = useSpaceDataFetch();
  const isMember = !!spaceValue.mySpaces.find(
    (element) => element.SpaceId === spacesData?.id
  );
  return (
    <>
      <Flex direction={"column"} width={"100%"} height={"130px"}>
        <Box height={"50%"} width={"100%"} bg={"whatsapp.400"} />
        <Flex width={"100%"} bg={"white"} flexGrow={"1"} justify={"center"}>
          <Flex width={"70%"} maxWidth={"760px"} justify={"space-between"}>
            <Box display={"flex"}>
              <Image
                boxSize="50px"
                objectFit="cover"
                src="https://shutr.bz/3ZkgIf4"
                alt="emike"
                borderRadius={"5px"}
                border={"2px solid white"}
                position={"relative"}
                top={"-3"}
              />
              <Flex direction={"column"}>
                <Text ml={"3"} fontWeight={"extrabold"}>
                  {spacesData?.id}
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
