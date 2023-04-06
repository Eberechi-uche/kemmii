import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Textarea, Flex, Button, Text, Box, Input } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useSetRecoilState } from "recoil";

type CommentInputProp = {
  user: User;
  commentText: string;
  setCommentText: (text: string) => void;
  onCreateComment: () => void;
  creatCommentLoading: boolean;
};

export const CommentInput: React.FC<CommentInputProp> = ({
  user,
  commentText,
  setCommentText,
  onCreateComment,
  creatCommentLoading,
}) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Flex
      pos="sticky"
      top="4"
      left="0"
      flexDir={"column"}
      width={"100%"}
      height={"fit-content"}
      bg="white"
      borderRadius={" 5px 5px 0 0"}
    >
      {user ? (
        <>
          <Flex
            width={"100%"}
            align={"center"}
            justify={"center"}
            flexDir={"column"}
          >
            <Input
              focusBorderColor="white"
              outline={"none"}
              maxW={"100%"}
              size={"lg"}
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setCommentText(e.target.value);
              }}
              _placeholder={{
                color: "brand.500",
              }}
              placeholder={"comment"}
              fontSize={{ base: "sm", md: "md" }}
            />
          </Flex>

          <Flex justify={"space-between"} py={"1"} align={"center"}>
            <Button
              size={{
                base: "xs",
                md: "sm",
              }}
              isDisabled={!commentText.length}
              onClick={onCreateComment}
              isLoading={creatCommentLoading}
            >
              comment
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex align={"center"} justify={"space-between"} px="4">
            <Text>login or sign up to comment</Text>
            <Flex justify={"space-between"}>
              <Button
                variant={"outline"}
                size={{
                  base: "xs",
                  md: "sm",
                }}
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
                size={{
                  base: "xs",
                  md: "sm",
                }}
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
      )}
    </Flex>
  );
};
