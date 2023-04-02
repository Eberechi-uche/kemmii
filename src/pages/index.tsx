import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post, Reaction } from "../Atoms/PostAtom";
import { usePostData } from "../components/Hooks/usePostData";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import { PageContentLayout } from "../components/layouts/PageContentLayout";
import { PostItem } from "../components/PostComponent/PostItem";
import { CreatePostLink } from "../components/Spaces.component.tsx/CreatePostLink";
import { auth, firestore } from "../firebase/clientApp";
import { useSpaceDataFetch } from "../components/Hooks/useSpaceDataFetch";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loadingFeeds, setLoadingFeeds] = useState("");
  const [error, setError] = useState("");
  const { spaceValue } = useSpaceDataFetch();

  const {
    setPostData,
    postData,
    onPostSelect,
    onReaction,
    onDeletePost,
    reactionloading,
  } = usePostData();

  const getLogggedIntUserFeed = async () => {
    setLoadingFeeds("loading");
    try {
      if (!spaceValue.mySpaces.length) {
        getNoUserFeed();
        return;
      }
      const mySpacesId = spaceValue.mySpaces.map((space) => space.spaceId);
      const postsQuerry = query(
        collection(firestore, "posts"),
        where("spaceId", "in", mySpacesId),
        limit(15)
      );
      const postDoc = await getDocs(postsQuerry);
      const posts = postDoc.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      setPostData((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getLoggedInUser", error.message);
    }
    setLoadingFeeds("from logged in user");
  };

  const getNoUserFeed = async () => {
    setLoadingFeeds("loading");
    try {
      const feedsQuerry = query(
        collection(firestore, "posts"),
        orderBy("reactions", "desc"),
        limit(20)
      );
      const postFeedsDocs = await getDocs(feedsQuerry);
      const posts = postFeedsDocs.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      setPostData((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("no user feeds", error.message);
    }
    setLoadingFeeds("loaded");
  };
  const getUserReactedPost = async () => {
    try {
      const postReactions = postData.posts.map((post) => post.id);
      const postQuery = query(
        collection(firestore, `users/${user?.uid}/reactions`),
        where("postId", "in", postReactions)
      );
      const userReactionDocs = await getDocs(postQuery);
      const userReactions = userReactionDocs.docs.map((reaction) => ({
        id: reaction.id,
        ...reaction.data(),
      }));
      setPostData((prev) => ({
        ...prev,
        reactions: userReactions as Reaction[],
      }));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!user && !loadingUser) {
      getNoUserFeed();
    }
  }, [user, loadingUser]);
  useEffect(() => {
    if (spaceValue.snippetFetched) getLogggedIntUserFeed();
  }, [spaceValue.snippetFetched]);
  useEffect(() => {
    if (user && postData.posts) getUserReactedPost();
  }, [user, postData.posts]);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <PageContentLayout>
        <>
          <p> {loadingFeeds}</p>
          <CreatePostLink />
          {postData.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onDeletePost={onDeletePost}
              onPostSelect={onPostSelect}
              onReaction={onReaction}
              userIsCreator={user?.uid === post.creatorId}
              loading={reactionloading === post.id}
              userReaction={
                postData.reactions.find(
                  (reaction) => reaction.postId === post.id
                )?.reactionValue
              }
            />
          ))}
        </>
        <></>
      </PageContentLayout>
    </>
  );
}
