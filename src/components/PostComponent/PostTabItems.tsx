import { TabItems } from "./NewPostForm";
import { Flex, Text, Icon } from "@chakra-ui/react";

type tabItemProps = {
  item: TabItems;
  isActive: boolean;
  setActive: (value: string) => void;
};

export const TabItem: React.FC<tabItemProps> = ({
  item,
  isActive,
  setActive,
}) => {
  return (
    <Flex
      px={"5"}
      py={"3"}
      bg={"white"}
      cursor={"pointer"}
      width={"100%"}
      m={"1"}
      fontSize={"12"}
      transition={"all 0.5s "}
      borderRadius={"5px"}
      color={isActive ? "brand.500" : "brand.700"}
      border={isActive ? "1px solid " : "brand.500"}
      _hover={{
        bg: "brand.200",
        color: "white",
      }}
      onClick={() => {
        setActive(item.title);
      }}
    >
      <Text mr={"5px"} fontWeight={700}>
        {item.title}
      </Text>
      <Flex align={"center"} justify={"center"}>
        <Icon as={item.icon} />
      </Flex>
    </Flex>
  );
};
