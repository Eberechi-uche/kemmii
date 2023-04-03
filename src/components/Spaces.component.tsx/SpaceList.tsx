import { Flex, Image, Text, Icon, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
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
  const route = useRouter();

  return (
    <ListItem
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={() => {
        onSpaceSelect({ link, displayText, imageUrl });
      }}
    >
      <Flex align={"center"}>
        {imageUrl ? (
          <Image
            objectFit={"cover"}
            src={imageUrl}
            width={"30px"}
            height={"30px"}
            borderRadius={"full"}
            alt={displayText}
          />
        ) : (
          <Icon as={RiUserSmileFill} fontSize={"30px"} color={"brand.700"} />
        )}
        <Text ml={"2"}>{displayText}</Text>
      </Flex>
    </ListItem>
  );
};
