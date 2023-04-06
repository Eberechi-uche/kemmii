import { useState } from "react";
import { ListItem, MenuItem } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Text, Icon } from "@chakra-ui/react";
import { CreateSpaceModal } from "@/src/components/modal/CreateSpace/CreateSpaceModal";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
export const CreateSpace: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <CreateSpaceModal
        active={isActive}
        setActive={() => setIsActive(false)}
      />
      <ListItem
        onClick={() => setIsActive(true)}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Icon as={AiOutlineAppstoreAdd} fontSize={"30px"} color={"brand.700"} />
        <Text fontSize={"lg"}>create space</Text>
      </ListItem>
    </>
  );
};
