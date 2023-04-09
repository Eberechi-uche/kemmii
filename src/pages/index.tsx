import {
  collection,
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
import { PostItem } from "../components/PostComponent/PostItem";
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
import NewSpace from "../components/Discover/NewSpace";
import { Space } from "../Atoms/spacesAtom";
import Link from "next/link";
import {
  NewPost,
  NewPostLayout,
} from "../components/Discover/TrendingPost/NewPost";
export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [tabIndex, setTabIndex] = useState(0);
  const [loadingFeeds, setLoadingFeeds] = useState(true);
  const [discoverSpaces, setDiscoverSpaces] = useState<Space[]>([]);
  const [trendingPost, setTrendingPost] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [tab, setCurrentTab] = useState("home");
  const { spaceValue, onSpaceJoinOrLeave, loading } = useSpaceDataFetch();
  const colors = useColorModeValue(
    ["#EBF8FF", "#d2f2e7"],
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

  const discoverFeeds = async () => {
    setLoadingFeeds(true);
    try {
      const feedsQuerry = query(
        collection(firestore, "spaces"),
        where("privacyType", "!=", "private"),
        limit(20)
      );
      const trendingPostQuerry = query(
        collection(firestore, "posts"),
        orderBy("numberOfComments", "desc"),
        limit(10)
      );
      const spaceDoc = await getDocs(feedsQuerry);
      const trendingPostDoc = await getDocs(trendingPostQuerry);
      const trendingPost = trendingPostDoc.docs.map((post) => ({
        id: post.id,
        ...post.data(),
      }));
      setTrendingPost(trendingPost as Post[]);
      const spaces = spaceDoc.docs.map((space) => ({
        id: space.id,
        ...space.data(),
      }));
      setDiscoverSpaces(spaces as Space[]);
    } catch (error: any) {
      console.log("no user feeds", error.message);
    }
    setLoadingFeeds(false);
  };

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
        limit(7)
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
    setError("");
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
      setError(error.message);
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
  }, [user, loadingUser]);
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
  useEffect(() => {
    if (discoverSpaces.length < 1) {
      discoverFeeds();
    }
  }, []);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Flex
        bg={bg}
        align={"center"}
        justify={"center"}
        flexDir={"column"}
        transition="all 1s ease-in-out"
        py={"5"}
        maxW={"100%"}
      >
        <>
          <Tabs
            variant="soft-rounded"
            size={"md"}
            colorScheme={tab == "home" ? "blue" : "green"}
            onChange={(index) => setTabIndex(index)}
            w={{ base: "100%", md: "45%" }}
          >
            <Flex flexDir={"column"}>
              <>
                {postData.posts && (
                  <NewPostLayout>
                    {trendingPost.map((post) => (
                      <Flex key={post.id}>
                        <NewPost post={post} onPostSelect={onPostSelect} />
                      </Flex>
                    ))}
                  </NewPostLayout>
                )}
              </>
            </Flex>
            <TabList ml={"1"}>
              <Tab
                onClick={() => {
                  setCurrentTab("home");
                }}
                transition="all 0.3s ease-in"
                fontWeight="400"
                p={"9px"}
              >
                your feeds
              </Tab>
              <Tab
                onClick={() => {
                  setCurrentTab("discover");
                }}
                transition="all 0.5s ease-in-out"
                fontWeight="400"
              >
                discover spaces
              </Tab>
            </TabList>
            <TabPanels transition="all 3s ease-in">
              <TabPanel px={"1"}>
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
              <TabPanel px={"1"}>
                {discoverSpaces.map((space) => (
                  <NewSpace
                    space={space}
                    key={space.id}
                    spaceAction={onSpaceJoinOrLeave}
                    isMember={
                      !!spaceValue.mySpaces.find(
                        (spaceItem) => spaceItem.spaceId === space.id
                      )
                    }
                    loading={loading}
                  />
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      </Flex>
    </>
  );
}
