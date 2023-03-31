import { Post } from "@/src/Atoms/PostAtom";
import { Space } from "@/src/Atoms/spacesAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../animations/Loading";
import { usePostData } from "../Hooks/usePostData";
import { PostItem } from "./PostItem";

type PostProps = {
  spaceData: Space;
};

export const Posts: React.FC<PostProps> = ({ spaceData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    postData,
    setPostData,
    onReaction,
    onDeletePost,
    onPostSelect,
    reactionloading,
  } = usePostData();

  const getSpacePost = async () => {
    setLoading(true);
    try {
      const postQuerry = query(
        collection(firestore, "posts"),
        where("spaceId", "==", spaceData.id),
        orderBy("createdAt", "desc")
      );
      const spacePostData = await getDocs(postQuerry);
      const postData = spacePostData.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      setPostData((prev) => ({
        ...prev,
        posts: postData as Post[],
      }));
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSpacePost();
  }, []);
  return (
    <>
      {loading ? (
        <Loading
          link={"https://assets10.lottiefiles.com/packages/lf20_h1bogema.json"}
        />
      ) : (
        postData.posts.map((post) => (
          <PostItem
            post={post}
            key={post.id}
            userReaction={
              postData.reactions.find((reaction) => reaction.postId === post.id)
                ?.reactionValue
            }
            onReaction={onReaction}
            userIsCreator={post.creatorId === user?.uid}
            onDeletePost={onDeletePost}
            onPostSelect={onPostSelect}
            loading={reactionloading}
          />
        ))
      )}
    </>
  );
};
