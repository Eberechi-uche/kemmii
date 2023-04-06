import { User } from "firebase/auth";
import { Box, Flex, Stack } from "@chakra-ui/react";

import { useEffect, useMemo, useState } from "react";
import { CommentInput } from "./CommentInput";
import { firestore } from "@/src/firebase/clientApp";
import { Post, postState } from "@/src/Atoms/PostAtom";
import CommentItem, { Comment } from "./CommentItem";
import {
  Timestamp,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import moment from "moment";
import { useSetRecoilState } from "recoil";
import { Loading } from "../../animations/Loading";

type CommentProps = {
  spaceId: string;
  selectedPost: Post | null;
  user: User;
};

export const Comments: React.FC<CommentProps> = ({
  selectedPost,
  spaceId,
  user,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchloading, setFetchLoading] = useState(false);
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const setPostAtomState = useSetRecoilState(postState);
  const onCreateComment = async () => {
    try {
      setIsCreatingComment(true);
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.displayName!,
        spaceId,
        postId: selectedPost?.id!,
        creatorImage: user.photoURL!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);
      // update comment count on post
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostAtomState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error: any) {
      console.log("creating comment", error.message);
    }
    setIsCreatingComment(false);
  };
  const onDeleteComment = async (commentID: Comment) => {
    try {
      const batch = writeBatch(firestore);
      const commentRef = doc(firestore, "comments", commentID.id);
      batch.delete(commentRef);
      const postRef = doc(firestore, "posts", commentID.postId);
      batch.update(postRef, {
        numberOfComments: increment(-1),
      });
      await batch.commit();
      const updateComment = comments.filter(
        (comment) => comment.id !== commentID.id
      );
      setComments(updateComment);
      setPostAtomState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
    setDeleteId("");
  };

  const getPostComment = async () => {
    setFetchLoading(true);
    try {
      const postQuerry = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id!),
        orderBy("createdAt", "desc")
      );
      const commentDocs = await getDocs(postQuerry);
      const commentData = commentDocs.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Comment)
      );

      setComments(commentData);
    } catch (error: any) {
      console.log(error.message);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    !comments.length && selectedPost && getPostComment();
  }, [selectedPost]);
  return (
    <>
      <Flex
        fontSize={{ base: "xs", md: "md" }}
        pos={"relative"}
        flexDir={"column"}
        pb={"20px"}
      >
        <CommentInput
          creatCommentLoading={isCreatingComment}
          user={user as User}
          commentText={commentText}
          setCommentText={setCommentText}
          onCreateComment={onCreateComment}
        />

        <Stack maxH={"75vh"} overflow={"scroll"} pt={"2"}>
          {fetchloading && (
            <Loading
              link={"https://assets6.lottiefiles.com/temp/lf20_6Xbo3i.json"}
            />
          )}

          {!fetchloading &&
            comments &&
            comments.map((comment) => (
              <Box key={comment.id}>
                <CommentItem
                  comment={comment}
                  onDeleteComment={onDeleteComment}
                  isOwner={user}
                  isDeleting={deleteId === comment.id}
                  setDeleteId={setDeleteId}
                />
              </Box>
            ))}
        </Stack>
      </Flex>
    </>
  );
};
