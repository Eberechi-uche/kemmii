import { Flex, Text, Icon, Spinner } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

import moment from "moment";
import { useState } from "react";
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
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};
export const CommentItem: React.FC<CommentItemProp> = ({
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
      <Flex key={comment.id} p={"4"} flexDir={"column"} bg={"facebook.100"}>
        <Flex>
          <Text fontWeight={"bold"}> {comment.creatorDisplayText}</Text>
          <Text ml={"5"}>{date === "Invalid date" ? "now" : date}</Text>
        </Flex>
        <Text>{comment.text} </Text>
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
    </>
  );
};