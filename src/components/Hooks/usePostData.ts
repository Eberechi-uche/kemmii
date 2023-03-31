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

export const usePostData = () => {
  const [postData, setPostData] = useRecoilState(postState);
  const currentSpace = useRecoilValue(spaceStateAtom)?.currentSpace;
  const [user] = useAuthState(auth);
  const [reactionloading, setReactionLoading] = useState(false);
  const [error, setError] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);

  const onReaction = async (post: Post, reaction: number, spaceId: string) => {
    if (!user?.uid) {
      setAuthModalState({
        open: true,
        view: "log in",
      });
      return;
    }
    setReactionLoading(true);
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
        updatedReaction = [...updatedReaction, newReaction];
      } else {
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
        (postItem) => postItem.id == post.id
      );
      updatedPosts[postIndx] = updatePost;

      setPostData((prev) => ({
        ...prev,
        posts: updatedPosts,
        reactions: updatedReaction,
      }));
      await batch.commit();
    } catch (error: any) {
      setError(error.message);
    }
    setReactionLoading(false);
  };
  const onDeletePost = async (post: Post): Promise<boolean> => {
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
    return true;
  };
  const onPostSelect = () => {};

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
