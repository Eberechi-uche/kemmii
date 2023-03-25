import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement, Flex } from "@chakra-ui/react";
type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1} ml={2}>
      <InputGroup>
        <Input
          type="text"
          placeholder="search post"
          focusBorderColor="rgb(182, 244, 146)"
          borderRadius={"full"}
        />
        <InputRightElement
          pointerEvents="none"
          children={<SearchIcon color="rgb(182, 244, 146)" />}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
