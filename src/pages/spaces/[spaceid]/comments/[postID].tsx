import { Post } from "@/src/Atoms/PostAtom";
import { usePostData } from "@/src/components/Hooks/usePostData";
import { useSpaceDataFetch } from "@/src/components/Hooks/useSpaceDataFetch";

import { Comments } from "@/src/components/PostComponent/CommentComponent/Comments";
import { PostItem } from "@/src/components/PostComponent/PostItem";

import { auth, firestore } from "@/src/firebase/clientApp";
import { Flex, Grid, Text, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdArrowRoundBack } from "react-icons/io";

const PostCommentPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const { spaceValue } = useSpaceDataFetch();
  const route = useRouter();
  const { onDeletePost, postData, setPostData, onReaction } = usePostData();
  const fetchPost = async (postId: string) => {
    try {
      const postRef = doc(firestore, "posts", postId);
      const postData = await getDoc(postRef);
      setPostData((prev) => ({
        ...prev,
        selectedPost: { id: postData.id, ...postData.data() } as Post,
      }));
    } catch (error) {
      setError("unable to retrieve post");
    }
  };
  useEffect(() => {
    const { postID } = route.query;
    if (postID && !postData.selectedPost) {
      fetchPost(postID as string);
    }
  }, [postData.selectedPost, route.query]);
  return (
    <>
      <Grid placeContent={"center"} mt={"1"}>
        <Flex
          flexDir={"column"}
          px={"1"}
          bg={"white"}
          width={{
            base: "100vw",
            md: "45vw",
          }}
        >
          <Icon
            as={IoMdArrowRoundBack}
            fontSize={"x-large"}
            p={"2px"}
            cursor={"pointer"}
            onClick={() => {
              route.back();
            }}
          />
          <>
            {postData.selectedPost && (
              <PostItem
                onDeletePost={onDeletePost}
                post={postData.selectedPost}
                userIsCreator={postData.selectedPost?.creatorId === user?.uid}
                onReaction={onReaction}
                userReaction={
                  postData.reactions.find(
                    (reaction) => reaction.postId === postData.selectedPost?.id
                  )?.reactionValue
                }
                actionError={error}
              />
            )}
          </>
          <Comments
            selectedPost={postData.selectedPost}
            spaceId={spaceValue.currentSpace?.id!}
            user={user as User}
          />
        </Flex>
      </Grid>
    </>
  );
};
export default PostCommentPage;
