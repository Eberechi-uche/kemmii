import { Post } from "@/src/Atoms/PostAtom";
import {
  Flex,
  Text,
  Image,
  Stack,
  Icon,
  Divider,
  Alert,
  AlertIcon,
  ScaleFade,
  Spinner,
  Button,
} from "@chakra-ui/react";

import { AiFillSmile } from "react-icons/ai";
import { MdEditLocationAlt } from "react-icons/md";
import { HiChatBubbleBottomCenterText, HiOutlineXMark } from "react-icons/hi2";
import { TbThumbUpFilled, TbThumbUp } from "react-icons/tb";
import { RiUserSmileFill } from "react-icons/ri";
import { HiRocketLaunch, HiOutlineRocketLaunch } from "react-icons/hi2";
import moment from "moment";
import { useState } from "react";
import { Loading } from "../animations/Loading";
import { useRouter } from "next/router";

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

export const PostItem: React.FC<PostItemProps> = ({
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
        fontSize={"xs"}
        p={"3"}
        borderRadius={"5px"}
        flexDir={"column"}
        bg={"white"}
        my={"2"}
        onClick={() => {
          onPostSelect && onPostSelect(post);
        }}
        cursor={"pointer"}
      >
        <Flex justify={"flex-start"} align={"center"}>
          <Flex align={"center"} justify={"center"}>
            {/* <Icon as={AiFillSmile} width={"45px"} height={"45px"} /> */}
            <Image />
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
                      <Icon as={MdEditLocationAlt} fontSize={"15"} />
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
        <Flex align={"center"} justify={"space-between"}>
          <Text fontWeight={"600"}>{post.title}</Text>
        </Flex>
        <Stack my={"1"}>
          {postID ? (
            <Text>{post.body}</Text>
          ) : (
            <Text noOfLines={[3, 5]}>{post.body}</Text>
          )}
        </Stack>

        {post.imageUrl && (
          <Stack align={"center"}>
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
              maxH={postID ? "fit-content" : "70px"}
              width={"100%"}
              objectFit={"cover"}
              borderRadius={"7px"}
              onLoad={() => {
                setLoadingImage(false);
              }}
              display={loadingImage ? "none" : "unset"}
            />
          </Stack>
        )}
        <Divider my={"2"} />
        <Flex
          py={"2"}
          width={"100%"}
          align={"center"}
          justify={"flex-start"}
          color={"brand.500"}
        >
          <Flex align={"center"} cursor={"pointer"} mx={"3"}>
            <Icon as={HiChatBubbleBottomCenterText} />
            <Text ml={"1"} fontSize={"xs"}>
              comments {post.numberOfComments}
            </Text>
          </Flex>
          <Flex
            align={"center"}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              onReaction &&
                onReaction(event, post, post.reactions, post.spaceId);
            }}
            cursor={"pointer"}
            mx={"3"}
          >
            <Flex
              color="brand.00"
              align={"center"}
              justify={"center"}
              maxW={"20px"}
              maxH={"20px"}
            >
              {loading ? (
                <Loading
                  link={`https://assets3.lottiefiles.com/packages/lf20_nz9vz5ng.json`}
                  size={40}
                  display={"inline-block"}
                  speed={1}
                  loop={false}
                />
              ) : (
                <Icon as={userReaction === 1 ? TbThumbUpFilled : TbThumbUp} />
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
                <Spinner size={{ base: "xs", md: "sm" }} />
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
