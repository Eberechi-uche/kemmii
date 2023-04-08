import { Flex, Image, Text, Icon, ListItem, Divider } from "@chakra-ui/react";

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
  return (
    <ListItem
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex align={"center"}>
        <Image
          objectFit={"cover"}
          src={imageUrl ? imageUrl : "/images/spaceDefault.png"}
          width={"30px"}
          height={"30px"}
          borderRadius={"full"}
          alt={displayText}
        />
        <Text ml={"2"}>{displayText}</Text>
      </Flex>
    </ListItem>
  );
};
