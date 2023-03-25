import { Stack, Textarea, Input, Button, Flex } from "@chakra-ui/react";
export type TextInputProp = {
  TextInput: {
    title: string;
    body: string;
  };
  loading: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
};
export const TextInput: React.FC<TextInputProp> = ({
  TextInput,
  loading,
  onChange,
  handleSubmit,
}) => {
  return (
    <>
      <Stack color={"gray.700"}>
        <Input
          value={TextInput.title}
          name={"title"}
          fontSize={{ base: "sm", md: "md" }}
          bg={"whatsapp.50"}
          borderRadius={"5px"}
          focusBorderColor={"whatsapp.100"}
          borderColor={"none"}
          border={"none"}
          placeholder={"post title"}
          _placeholder={{
            color: "gray.500",
            fontSize: { base: "sm", md: "md" },
          }}
          onChange={onChange}
        />
        <Textarea
          value={TextInput.body}
          _placeholder={{
            color: "gray.500",
            fontSize: { base: "sm", md: "md" },
          }}
          placeholder={"post"}
          fontSize={{ base: "sm", md: "md" }}
          bg={"whatsapp.50"}
          borderRadius={"5px"}
          focusBorderColor={"whatsapp.100"}
          borderColor={"none"}
          border={"none"}
          name={"body"}
          height={"150"}
          onChange={onChange}
        />
        <Flex justify={"center"}>
          <Button
            isDisabled={!TextInput.body || !TextInput.title}
            size={{ base: "sm", md: "md" }}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Post
          </Button>
        </Flex>
      </Stack>
    </>
  );
};
