import { Post } from "@/src/Atoms/PostAtom";
import { usePostData } from "@/src/components/Hooks/usePostData";
import { useSpaceDataFetch } from "@/src/components/Hooks/useSpaceDataFetch";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { Comments } from "@/src/components/PostComponent/CommentComponent/Comments";
import { PostItem } from "@/src/components/PostComponent/PostItem";
import { About } from "@/src/components/Spaces.component.tsx/About";
import { auth, firestore } from "@/src/firebase/clientApp";
import { Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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
  }, [postData.selectedPost, route]);
  return (
    <>
      <PageContentLayout>
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

          <Comments
            selectedPost={postData.selectedPost}
            spaceId={spaceValue.currentSpace?.id!}
            user={user as User}
          />
        </>

        <>
          {spaceValue.currentSpace && (
            <About spaceData={spaceValue.currentSpace} />
          )}
        </>
      </PageContentLayout>
    </>
  );
};
export default PostCommentPage;
