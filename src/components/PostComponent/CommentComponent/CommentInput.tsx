import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { Textarea, Flex, Button, Text, Icon, Image } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { BsFillSendFill } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import NoUserSignIn from "../../modal/Auth/NoUser";

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
      justify={"space-between"}
    >
      {user ? (
        <Flex width={"100%"} mx={"5"}>
          <Image
            src={user?.photoURL ? user.photoURL : "/images/default.png"}
            alt={"logo"}
            boxSize={"35px"}
            position={"absolute"}
            left={"0"}
            borderRadius={"full"}
          />

          <Textarea
            maxW={"90%"}
            ml={"5"}
            variant={"flushed"}
            _focus={{
              resize: "none",
            }}
            border={"none"}
            focusBorderColor="white"
            outline={"none"}
            value={commentText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              e.preventDefault();
              setCommentText(e.target.value);
            }}
            _placeholder={{
              color: "brand.500",
            }}
            placeholder={"comment"}
            fontSize={"16px"}
            maxWidth={"90%"}
          />

          <Button
            size={"md"}
            isDisabled={!commentText.length}
            onClick={onCreateComment}
            isLoading={creatCommentLoading}
            width={"10%"}
          >
            <Icon as={BsFillSendFill} />
          </Button>
        </Flex>
      ) : (
        <NoUserSignIn />
      )}
    </Flex>
  );
};
