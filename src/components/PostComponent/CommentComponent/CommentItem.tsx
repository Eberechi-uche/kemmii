import { Flex, Text, Icon, Spinner, Image, Divider } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

import moment from "moment";
import { MdOutlineDeleteForever } from "react-icons/md";

type CommentItemProp = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  setDeleteId: (id: string) => void;
  isOwner: User;
  isDeleting: boolean;
};
export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  spaceId: string;
  postId: string;
  creatorImage: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};
const CommentItem: React.FC<CommentItemProp> = ({
  comment,
  onDeleteComment,
  isOwner,
  setDeleteId,
  isDeleting,
}) => {
  const date = moment(new Date(comment.createdAt?.seconds * 1000)).fromNow();
  const handleDelete = (comment: Comment) => {
    setDeleteId(comment.id);
    onDeleteComment(comment);
  };
  return (
    <>
      <Flex
        key={comment.id}
        py={"3"}
        flexDir={"column"}
        bg={"white"}
        my={"2"}
        fontSize={"md"}
      >
        <Flex>
          <Image
            src={
              comment.creatorImage
                ? `${comment.creatorImage}`
                : "/images/default.png"
            }
            alt={comment.creatorDisplayText}
            boxSize={"30px"}
          />
          <Text fontWeight={"bold"} ml={"1"}>
            {comment.creatorDisplayText}
          </Text>
          <Text ml={"2"}>{date === "Invalid date" ? "now" : date}</Text>
        </Flex>
        <Text pt={"3"}>{comment.text} </Text>
        {isOwner && isOwner.uid === comment.creatorId && (
          <Flex justify={"flex-end"}>
            {!isDeleting ? (
              <Icon
                as={MdOutlineDeleteForever}
                onClick={() => {
                  handleDelete(comment);
                }}
                cursor={"pointer"}
              />
            ) : (
              <Spinner size={{ base: "xs", md: "sm" }} color="#822727" />
            )}
          </Flex>
        )}
      </Flex>
      <Divider />
    </>
  );
};

export default CommentItem;
