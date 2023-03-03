import { Flex, Input, Button } from "@chakra-ui/react";

export const ResetPassword: React.FC = () => {
  return (
    <Flex>
      <Input placeholder="Email" />
      <Button> Reset</Button>
    </Flex>
  );
};
