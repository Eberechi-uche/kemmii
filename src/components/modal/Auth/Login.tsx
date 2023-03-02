import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export const Login: React.FC = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const setAuthState = useSetRecoilState(authModalState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const onSubmit = () => {};
  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder="Email"
        name="email"
        type={"email"}
        mb={2}
        required
        focusBorderColor="rgb(182, 244, 146)"
      />
      <Input
        placeholder="Password"
        name="password"
        type={"password"}
        required
        mb={"2"}
        focusBorderColor="rgb(182, 244, 146)"
      />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        paddingY={"3"}
      >
        <Button type="submit" width={"80%"}>
          Login
        </Button>
      </Flex>
      <Flex dir="row" justify={"center"} align={"center"}>
        <Text fontSize={"sm"} pr={"2"}>
          No account?
        </Text>
        <Text
          color={"rgb(51, 139, 147)"}
          onClick={() =>
            setAuthState((prev) => ({
              ...prev,
              view: "sign up",
            }))
          }
          _hover={{
            cursor: "pointer",
          }}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
