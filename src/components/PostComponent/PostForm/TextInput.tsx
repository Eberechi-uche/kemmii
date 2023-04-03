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
          borderRadius={"5px"}
          borderColor={"brand.50"}
          placeholder={"post title"}
          _placeholder={{
            color: "gray.500",
          }}
          onChange={onChange}
        />
        <Textarea
          value={TextInput.body}
          _placeholder={{
            color: "gray.500",
          }}
          placeholder={"post"}
          borderRadius={"5px"}
          borderColor={"brand.50"}
          name={"body"}
          height={"150"}
          onChange={onChange}
        />
        <Flex justify={"center"}>
          <Button
            isDisabled={!TextInput.body || !TextInput.title}
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
