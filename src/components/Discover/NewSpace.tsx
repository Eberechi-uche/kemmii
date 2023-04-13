import { Space } from "@/src/Atoms/spacesAtom";
import {
  Button,
  Flex,
  Stack,
  Image,
  Text,
  Grid,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";

type NewSpaceProp = {
  space: Space;
  spaceAction: (space: Space, isMember: boolean) => void;
  isMember: boolean;
  loading: boolean;
};

const NewSpace: React.FC<NewSpaceProp> = ({
  space,
  spaceAction,
  isMember,
  loading,
}) => {
  const handleSpaceJoin = (e: React.MouseEvent) => {
    e.stopPropagation();

    spaceAction(space, isMember);
    return;
  };
  return (
    <>
      <Stack p={"2"} bg={"#FFFFFF"} my={"0.5"} borderRadius={"4px"}>
        <Link href={`/spaces/${space.id}`}>
          <Flex>
            <Image
              boxSize={"20%"}
              objectFit={"fill"}
              borderRadius={"full"}
              src={space.imageUrl ? space.imageUrl : "/images/spaceDefault.png"}
              alt={"space image"}
            />
            <Flex ml={"2"} flexDir={"column"}>
              <Text>{space.id}</Text>
              <Text> {space.numberOfMembers}</Text>
              <Text> {space.desc}</Text>
            </Flex>
          </Flex>
        </Link>
        <Button
          isLoading={loading}
          width={"20%"}
          variant={isMember ? "outline" : "solid"}
          placeSelf={"end"}
          onClick={(e: React.MouseEvent) => {
            handleSpaceJoin(e);
          }}
          size={"sm"}
        >
          {isMember ? "joined" : "join"}
        </Button>
      </Stack>
      <Divider />
    </>
  );
};

export default NewSpace;
