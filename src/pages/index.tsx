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
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Loading } from "../components/animations/Loading";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [tabIndex, setTabIndex] = useState(0);
  const [loadingFeeds, setLoadingFeeds] = useState(true);
  const [discoverSpaces, setDiscoverSpaces] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [tab, setCurrentTab] = useState("home");
  const { spaceValue } = useSpaceDataFetch();
  const colors = useColorModeValue(
    ["#EBF8FF", "#E6FFFA"],
    ["red.900", "teal.900"]
  );
  const bg = colors[tabIndex];
  const {
    setPostData,
    postData,
    onPostSelect,
    onReaction,
    onDeletePost,
    reactionloading,
  } = usePostData();

  const getLogggedIntUserFeed = async () => {
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
    setLoadingFeeds(false);
  };

  const getNoUserFeed = async () => {
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
      setDiscoverSpaces(posts as Post[]);
    } catch (error: any) {
      console.log("no user feeds", error.message);
    }
    setLoadingFeeds(false);
  };
  const getUserReactedPost = async () => {
    try {
      const postReactions = postData.posts.map((post) => post.id);
      const postQuery = query(
        collection(firestore, `users/${user?.uid}/reactions`),
        where("postId", "in", postReactions),
        limit(15)
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
    if (tab === "discover" && !discoverSpaces.length) {
      getNoUserFeed();
    }
  }, [user, loadingUser, tab]);
  useEffect(() => {
    if (spaceValue.snippetFetched) getLogggedIntUserFeed();
  }, [spaceValue]);
  useEffect(() => {
    if (user && postData.posts) getUserReactedPost();
  }, [user, postData.posts]);
  useEffect(() => {
    if (!user) {
      setPostData((prev) => ({
        ...prev,
        reactions: [],
      }));
    }
  }, [user]);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Flex bg={bg} width={"100%"} align={"center"} justify={"center"}>
        <PageContentLayout>
          <>
            <Tabs
              variant="soft-rounded"
              size={"sm"}
              onChange={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab
                  onClick={() => {
                    setCurrentTab("home");
                  }}
                >
                  your feeds
                </Tab>
                <Tab
                  onClick={() => {
                    setCurrentTab("discover");
                  }}
                >
                  discover spaces
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <CreatePostLink />
                  {loadingFeeds ? (
                    <Loading
                      link={
                        "https://assets2.lottiefiles.com/packages/lf20_ngCmDSkEvD.json"
                      }
                    />
                  ) : (
                    postData.posts.map((post) => (
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
                    ))
                  )}
                </TabPanel>
                <TabPanel>
                  <CreatePostLink />
                  {loadingFeeds ? (
                    <Loading
                      link={
                        "https://assets2.lottiefiles.com/packages/lf20_ngCmDSkEvD.json"
                      }
                    />
                  ) : (
                    discoverSpaces.map((post) => (
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
                    ))
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
          <>{/* <HomePageSideBar /> */}</>
        </PageContentLayout>
      </Flex>
    </>
  );
}

const HomePageSideBar: React.FC = () => {
  return (
    <>
      <Flex
        width={"100%"}
        p={"5px"}
        borderRadius={"5px"}
        mb={"2"}
        bg={"white"}
        flexDir={"column"}
        fontSize={{ base: "xx-small", md: "x-small" }}
        height={"fit-content"}
      >
        <Text>
          Discover top Space: this would be available as more users sign in and
          create spaces and join spaces
        </Text>
        <Button size={{ base: "xs", md: "sm" }}> discover top spaces</Button>
      </Flex>
    </>
  );
};
