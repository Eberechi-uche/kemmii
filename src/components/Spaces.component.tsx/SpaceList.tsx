import { SpaceSnippet } from "@/src/Atoms/spacesAtom";
import { Flex, MenuItem, Image, Text, Icon } from "@chakra-ui/react";
import { RiUserSmileFill } from "react-icons/ri";
type SpaceListProp = {
  spaceSnippet: SpaceSnippet;
};

export const SpaceList: React.FC<SpaceListProp> = ({ spaceSnippet }) => {
  const { spaceId, imageUrl } = spaceSnippet;
  return (
    <MenuItem
      key={spaceId}
      onClick={() => {
        route.push(`/spaces/${spaceId}`);
      }}
    >
      <Flex align={"center"}>
        {imageUrl ? (
          <Image
            objectFit={"cover"}
            src={imageUrl}
            width={"25px"}
            height={"25px"}
            borderRadius={"full"}
          />
        ) : (
          <Icon
            as={RiUserSmileFill}
            width={"30px"}
            height={"30px"}
            borderRadius={"full"}
          />
        )}

        <Text ml={"2"}>{spaceId}</Text>
      </Flex>
    </MenuItem>
  );
};
