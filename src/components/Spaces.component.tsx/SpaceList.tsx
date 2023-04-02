import { Flex, MenuItem, Image, Text, Icon } from "@chakra-ui/react";
import { RiUserSmileFill } from "react-icons/ri";
import { useSpaceListState } from "../Hooks/useSpaceListState";

type SpaceListProp = {
  link: string;
  displayText: string;
  imageUrl: string;
};

export const SpaceList: React.FC<SpaceListProp> = ({
  link,
  displayText,
  imageUrl,
}) => {
  const { onSpaceSelect } = useSpaceListState();

  return (
    <MenuItem
      onClick={() => {
        onSpaceSelect({ link, displayText, imageUrl });
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

        <Text ml={"2"}>{displayText}</Text>
      </Flex>
    </MenuItem>
  );
};
