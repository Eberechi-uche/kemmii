import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Post, postState, Reaction } from "@/src/Atoms/PostAtom";
import { deleteObject, ref } from "firebase/storage";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { useEffect, useState } from "react";
import { spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { useRouter } from "next/router";

export const usePostData = () => {
  const [postData, setPostData] = useRecoilState(postState);
  const currentSpace = useRecoilValue(spaceStateAtom)?.currentSpace;
  const [user] = useAuthState(auth);
  const [reactionloading, setReactionLoading] = useState("");
  const [error, setError] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);
  const route = useRouter();

  const onReaction = async (
    event: React.MouseEvent<HTMLDivElement>,
    post: Post,
    reaction: number,
    spaceId: string
  ) => {
    if (!user?.uid) {
      setAuthModalState({
        open: true,
        view: "log in",
      });
      return;
    }
    event.stopPropagation();
    setReactionLoading(post.id!);
    try {
      let { reactions } = post;
      const reacted = postData.reactions.find(({ postId }) => {
        return postId == post.id;
      });
      const updatePost = { ...post };
      let updatedPosts = [...postData.posts];
      let updatedReaction = [...postData.reactions];
      let reactValue = reaction;

      const batch = writeBatch(firestore);

      if (!reacted) {
        const reactionRef = doc(
          collection(firestore, "users", `${user?.uid}/reactions`)
        );
        const newReaction: Reaction = {
          id: reactionRef.id,
          postId: post.id!,
          spaceId: spaceId,
          reactionValue: 1,
        };

        batch.set(reactionRef, newReaction);
        updatePost.reactions = reaction + 1;
        reactValue = reactions + 1;
        updatedReaction = [...postData.reactions, newReaction];
      } else {
        setReactionLoading("");
        const reactionRef = doc(
          firestore,
          "users",
          `${user?.uid}/reactions/${reacted.id}`
        );

        updatePost.reactions = reactions - 1;
        reactValue = reactions - 1;

        batch.delete(reactionRef);

        updatedReaction = updatedReaction.filter(
          ({ postId }) => postId !== post.id
        );
      }

      const postRef = doc(firestore, "posts", `${post.id}`);

      batch.update(postRef, { reactions: reactValue });

      const postIndx = updatedPosts.findIndex(
        (postItem) => postItem.id === post.id
      );
      updatedPosts[postIndx] = updatePost;

      setPostData((prev) => ({
        ...prev,
        posts: updatedPosts,
        reactions: updatedReaction,
      }));
      if (postData.selectedPost) {
        setPostData((prev) => ({
          ...prev,
          selectedPost: updatePost,
          reactions: updatedReaction,
        }));
      }
      await batch.commit();
    } catch (error: any) {
      setError(error.message);
    }
    setReactionLoading("");
  };
  const onDeletePost = async (
    event: React.MouseEvent<HTMLDivElement>,
    post: Post
  ): Promise<boolean> => {
    event.stopPropagation();
    try {
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);
      setPostData((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
    } catch (error) {
      return false;
    }

    route.push(`/spaces/${post.spaceId}`);
    return true;
  };
  const onPostSelect = (post: Post) => {
    setPostData((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    route.push(`/spaces/${post.spaceId}/comments/${post.id}`);
  };

  const getUsersPostReactions = async (spaceId: string) => {
    try {
      const userPostReactionsQuerry = query(
        collection(firestore, "users", `${user?.uid}/reactions`),
        where("spaceId", "==", spaceId)
      );
      const userReactionsDoc = await getDocs(userPostReactionsQuerry);
      const userReactionsData = userReactionsDoc.docs.map((userDocs) => ({
        id: userDocs.id,
        ...userDocs.data(),
      }));
      setPostData((prev) => ({
        ...prev,
        reactions: userReactionsData as Reaction[],
      }));
    } catch (error: any) {
      setError(error.message);
    }
  };
  useEffect(() => {
    if (!user || !currentSpace?.id) return;
    getUsersPostReactions(currentSpace?.id);
    return;
  }, [user, currentSpace]);
  useEffect(() => {
    if (!user) {
      setPostData((prev) => ({
        ...prev,
        reactions: [],
      }));
    }
  }, [user]);
  return {
    postData,
    setPostData,
    onReaction,
    onDeletePost,
    onPostSelect,
    reactionloading,
  };
};
