import { useState } from "react";
import { MenuItem } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { CreateSpaceModal } from "@/src/components/modal/CreateSpace/CreateSpaceModal";

export const CreateSpace: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <CreateSpaceModal
        active={isActive}
        setActive={() => setIsActive(false)}
      />
      <MenuItem icon={<AddIcon />} onClick={() => setIsActive(true)}>
        <Text>create space</Text>
      </MenuItem>
    </>
  );
};
