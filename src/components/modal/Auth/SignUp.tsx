import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export const SignUp = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const setAuthState = useSetRecoilState(authModalState);
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"email"}
        name="email"
        placeholder="Email"
        mb={"2"}
        onChange={handleFormChange}
        value={formValue.email}
        required
        focusBorderColor="rgb(182, 244, 146)"
      />
      <Input
        type={"password"}
        name="password"
        placeholder="password"
        mb={"2"}
        onChange={handleFormChange}
        required
        focusBorderColor="rgb(182, 244, 146)"
      />
      <Input
        type={"password"}
        name="password"
        placeholder="confirm password"
        mb={"2"}
        onChange={handleFormChange}
        required
        focusBorderColor="rgb(182, 244, 146)"
      />
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        paddingY={"3"}
      >
        <Button type="submit" variant={"outline"} width={"80%"}>
          Sign in
        </Button>
      </Flex>
      <Flex dir="row" justify={"center"} align={"center"}>
        <Text fontSize={"sm"} pr={"2"}>
          already have an account?
        </Text>
        <Text
          color={"rgb(51, 139, 147)"}
          _hover={{
            cursor: "pointer",
          }}
          onClick={() =>
            setAuthState((prev) => ({
              ...prev,
              view: "log in",
            }))
          }
        >
          LOGIN
        </Text>
      </Flex>
    </form>
  );
};
