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

import { AiOutlineFire, AiTwotoneFire, AiFillSmile } from "react-icons/ai";
import { HiChatBubbleBottomCenterText, HiOutlineXMark } from "react-icons/hi2";
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
  const { spaceid } = route.query;

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
        <Flex align={"center"} justify={"space-between"}>
          <Text fontWeight={"bold"} my={"1"}>
            {post.title}
          </Text>
          {!spaceid && (
            <>
              <Text
                fontSize={"x-small"}
                fontWeight={"extrabold"}
                onClick={(e) => {
                  handleSpaceRoute(e, `/spaces/${post.spaceId}`);
                }}
                color={"whatsapp.600"}
                letterSpacing={"0.5px"}
                _hover={{
                  color: "whatsapp.800",
                  textDecoration: "underline",
                }}
                border={"0.5px solid"}
                borderRadius={"full"}
                px={"2"}
              >
                posted in: {post.spaceId}
              </Text>
            </>
          )}
        </Flex>

        <Flex justify={"flex-start"} align={"center"}>
          <Flex align={"center"} justify={"center"}>
            <Icon as={AiFillSmile} width={"30px"} height={"30px"} />
            <Flex flexDir={"column"} ml={"1"}>
              <Text pb={"none"} fontWeight={"bold"}>
                {post.creatorDisplayName}
              </Text>
              <Text pt={"none"} fontSize={{ base: "xx-small", md: "x-small" }}>
                {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Stack my={"4"}>
          <Text noOfLines={[5, 7]}>{post.body}</Text>
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
              maxH={"200px"}
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
          color={"whatsapp.500"}
        >
          <Flex
            align={"center"}
            cursor={"pointer"}
            mx={"3"}
            _hover={{
              color: "white",
            }}
            p={"3px 7px"}
            borderRadius={"5px"}
          >
            <Icon as={HiChatBubbleBottomCenterText} />
            <Text fontSize={"sm"}>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align={"center"}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              onReaction &&
                onReaction(event, post, post.reactions, post.spaceId);
            }}
            cursor={"pointer"}
            mx={"3"}
            _hover={{
              backgroundColor: "whatsapp.100",
              color: "white",
            }}
            p={"3px 7px"}
            borderRadius={"5px"}
          >
            <Flex
              color="#0F603E"
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
                  speed={2}
                  loop={false}
                />
              ) : (
                <Icon
                  as={
                    userReaction === 1 ? HiRocketLaunch : HiOutlineRocketLaunch
                  }
                />
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
              _hover={{
                backgroundColor: "whatsapp.100",
                color: "white",
              }}
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
