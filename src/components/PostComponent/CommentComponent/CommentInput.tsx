import { authModalState } from "@/src/Atoms/AuthModalAtom";
import {
  Textarea,
  Flex,
  Button,
  Text,
  Icon,
  Input,
  Image,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { BsFillSendFill } from "react-icons/bs";
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
      bottom="0"
      left="0"
      width={"100%"}
      height={"fit-content"}
      bg="white"
      borderRadius={" 5px 5px 0 0"}
      align={"center"}
      pb={"2"}
    >
      {user ? (
        <>
          <Flex maxW={"100%"} justify={"center"} flexGrow={"1"}>
            <Image
              src={user?.photoURL ? user.photoURL : "/images/default.png"}
              alt={"logo"}
              boxSize={"30px"}
              mr={"2"}
            />
            <Textarea
              resize={"none"}
              variant={"flushed"}
              size={"md"}
              border={"none"}
              focusBorderColor="white"
              outline={"none"}
              maxW={"100%"}
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.preventDefault();
                setCommentText(e.target.value);
              }}
              _placeholder={{
                color: "brand.500",
              }}
              placeholder={"comment"}
              fontSize={"md"}
            />
          </Flex>

          <Button
            size={"md"}
            isDisabled={!commentText.length}
            onClick={onCreateComment}
            isLoading={creatCommentLoading}
            width={"10%"}
          >
            <Icon as={BsFillSendFill} />
          </Button>
        </>
      ) : (
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
      )}
    </Flex>
  );
};
