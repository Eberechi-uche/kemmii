import { Post } from "@/src/Atoms/PostAtom";
import {
  Flex,
  Text,
  Image,
  Stack,
  Icon,
  Alert,
  AlertIcon,
  ScaleFade,
  Spinner,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

import { HiOutlineXMark } from "react-icons/hi2";

import moment from "moment";
import { useState } from "react";
import { Loading } from "../animations/Loading";
import { useRouter } from "next/router";
import { BiComment } from "react-icons/bi";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userReaction?: number | undefined;
  onReaction?: (
    event: React.MouseEvent<HTMLDivElement>,
    post: Post,
    reaction: number,
    spaceId: string
  ) => void;
  onDeletePost: (
    event: React.MouseEvent<HTMLDivElement>,
    post: Post
  ) => Promise<boolean>;
  onPostSelect?: (post: Post) => void;
  loading?: boolean;
  actionError?: string;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userReaction,
  onReaction,
  onDeletePost,
  onPostSelect,
  loading,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [error, setError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const route = useRouter();
  const { spaceid, postID } = route.query;

  const handleSpaceRoute = (event: React.MouseEvent, to: string) => {
    event.stopPropagation();
    route.push(to);
  };

  const handlePostDelete = async (event: React.MouseEvent<HTMLDivElement>) => {
    setError("");
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(event, post);
      if (!success) {
        throw new Error("failed to delete post");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <>
      <Flex
        fontSize={"md"}
        borderRadius={"3px"}
        flexDir={"column"}
        my={"2"}
        onClick={() => {
          onPostSelect && onPostSelect(post);
        }}
        p={"4"}
        cursor={"pointer"}
        border={"2px solid"}
        borderColor={"gray.200"}
      >
        <Flex justify={"flex-start"} align={"center"} width={"100%"}>
          <Flex align={"center"} justify={"center"}>
            <Image
              boxSize={"35px"}
              src={
                post.creatorImageUrl
                  ? post.creatorImageUrl
                  : "/images/default.png"
              }
              borderRadius={"full"}
            />
            <Flex flexDir={"column"} ml={"1"}>
              <Text pb={"none"} fontWeight={"500"}>
                {post.creatorDisplayName}
              </Text>
              <Flex
                fontSize={{ base: "x-small", md: "small" }}
                align={"center"}
              >
                {!spaceid && (
                  <>
                    <Text
                      color={"brand.500"}
                      fontWeight={"600"}
                      mr={"2"}
                      fontSize={"10pt"}
                      display={"flex"}
                      alignItems={"center"}
                      onClick={(e) => {
                        handleSpaceRoute(e, `/spaces/${post.spaceId}`);
                      }}
                    >
                      posted-
                      {post.spaceId}
                    </Text>
                  </>
                )}
                <Text pt={"none"}>
                  {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex align={"center"} justify={"space-between"} my={"4"}>
          <Text fontWeight={"600"}>{post.title}</Text>
        </Flex>
        <Flex
          width={"100%"}
          justify={"space-between"}
          flexDir={postID ? "column" : "row"}
        >
          <Stack my={"1"} mr={"2"} width={"100%"}>
            {postID ? (
              <ReactMarkdown>{post.body}</ReactMarkdown>
            ) : (
              <Text noOfLines={[5, 7]}>
                <ReactMarkdown>{post.body}</ReactMarkdown>
              </Text>
            )}
          </Stack>

          {post.imageUrl && (
            <Stack align={"center"} maxWidth={[postID ? "100%" : "50%"]}>
              {loadingImage && (
                <Loading
                  link={
                    "https://assets4.lottiefiles.com/temporary_files/b7BtQW.json"
                  }
                />
              )}
              <Image
                src={post.imageUrl}
                alt={post.creatorDisplayName}
                objectFit={"cover"}
                h={postID ? "100%" : "100px"}
                width={postID ? "100%" : "200px"}
                borderRadius={"3px"}
                onLoad={() => {
                  setLoadingImage(false);
                }}
                display={loadingImage ? "none" : "unset"}
              />
            </Stack>
          )}
        </Flex>

        <Flex
          py={"2"}
          width={"100%"}
          align={"center"}
          justify={"space-between"}
          border={"1px solid"}
          my={"2"}
          borderRadius={"3"}
          borderColor={"gray.100"}
        >
          <Flex align={"center"} cursor={"pointer"} mx={"3"}>
            <Icon as={BiComment} />
            <Text ml={"1"} fontSize={"md"}>
              {post.numberOfComments}
            </Text>
          </Flex>
          <Flex
            align={"center"}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              onReaction!(event, post, post.reactions, post.spaceId);
            }}
            cursor={"pointer"}
            mx={"3"}
          >
            <Flex
              align={"center"}
              justify={"center"}
              maxW={"20px"}
              maxH={"20px"}
            >
              {loading ? (
                <Loading
                  link={`https://assets3.lottiefiles.com/packages/lf20_nz9vz5ng.json`}
                  size={20}
                  display={"inline-block"}
                  speed={1}
                  loop={false}
                />
              ) : (
                <Icon as={userReaction === 1 ? BsSuitHeartFill : BsSuitHeart} />
              )}
              <Text fontSize={"md"}>{post.reactions}</Text>
            </Flex>
          </Flex>
          {userIsCreator && (
            <Flex
              align={"center"}
              onClick={handlePostDelete}
              cursor={"pointer"}
              mx={"3"}
              p={"3px 7px"}
              borderRadius={"5px"}
            >
              {!loadingDelete ? (
                <>
                  <Icon as={HiOutlineXMark} />
                  <Text fontSize={"sm"}>delete</Text>
                </>
              ) : (
                <Spinner size={"md"} />
              )}
            </Flex>
          )}
        </Flex>
        {error.length > 1 && (
          <ScaleFade initialScale={0.9} in={error.length > 1}>
            <Alert status="error" borderRadius={"5px"}>
              <AlertIcon />
              {error}
            </Alert>
          </ScaleFade>
        )}
      </Flex>
    </>
  );
};
export default PostItem;
