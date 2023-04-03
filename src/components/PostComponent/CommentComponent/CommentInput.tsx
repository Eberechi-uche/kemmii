import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Textarea, Flex, Button, Text, Box } from "@chakra-ui/react";
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
  const insertEmoji = (emoji: string) => {
    setCommentText(commentText + emoji);
  };

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
          <Textarea
            borderColor={"white"}
            size={"lg"}
            value={commentText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              setCommentText(e.target.value);
            }}
            focusBorderColor={"whatsapp.500"}
            _placeholder={{
              color: "whatsapp.500",
              fontSize: { base: "xs", md: "sm" },
            }}
            fontSize={"inherit"}
            placeholder={"comment"}
          />
          <Flex justify={"space-between"} py={"2"} align={"center"}>
            <Flex
              //   bg={"white"}
              width={"100%"}
              justify={"space-around"}
              height={"fit-content"}
            >
              <Text
                onClick={() => {
                  insertEmoji(" \uD83D\uDE02");
                }}
                cursor={"pointer"}
              >
                \uD83D\uDE02
              </Text>
              <Text
                onClick={() => {
                  insertEmoji(" 👊🏿");
                }}
                cursor={"pointer"}
              >
                👊🏿
              </Text>
              <Text
                onClick={() => {
                  insertEmoji(" \uD83D\uDD25");
                }}
                cursor={"pointer"}
              >
                \uD83D\uDD25
              </Text>
              <Text
                onClick={() => {
                  insertEmoji(" \uD83D\uDE22");
                }}
                cursor={"pointer"}
              >
                \uD83D\uDE22
              </Text>
              <Text
                onClick={() => {
                  insertEmoji(" 🤎");
                }}
                cursor={"pointer"}
              >
                🤎
              </Text>
              <Text
                onClick={() => {
                  insertEmoji(" 🤌🏿");
                }}
                cursor={"pointer"}
              >
                🤌🏿
              </Text>
            </Flex>
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
