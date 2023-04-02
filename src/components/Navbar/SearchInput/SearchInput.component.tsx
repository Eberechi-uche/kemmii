import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, InputRightElement, Flex } from "@chakra-ui/react";
type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <Flex flexGrow={1} ml={2} width={{ base: "30%", md: "unset" }}>
      <InputGroup>
        <Input
          type="text"
          placeholder="search post"
          focusBorderColor="rgb(182, 244, 146)"
          borderRadius={"full"}
          _placeholder={{
            fontSize: { base: "xs", md: "md" },
          }}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="rgb(182, 244, 146)" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
