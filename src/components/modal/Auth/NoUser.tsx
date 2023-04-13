import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Flex, Button, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

const NoUserSignIn: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Flex align={"center"} justify={"space-between"} px="4">
        <Text>login or sign up to comment</Text>
        <Flex justify={"space-between"}>
          <Button
            variant={"outline"}
            size={"md"}
            onClick={() => {
              setAuthModalState({
                view: "log in",
                open: true,
              });
            }}
          >
            login
          </Button>
          <Button
            size={"md"}
            onClick={() => {
              setAuthModalState({
                view: "sign up",
                open: true,
              });
            }}
          >
            sign up
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default NoUserSignIn;
