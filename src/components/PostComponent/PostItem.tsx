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
import { SiEgghead } from "react-icons/si";
import { AiOutlineFire, AiTwotoneFire } from "react-icons/ai";
import { HiChatBubbleBottomCenterText, HiOutlineXMark } from "react-icons/hi2";
import moment from "moment";
import { useState } from "react";
import { Loading } from "../animations/Loading";
import { Posts } from "./Posts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userReaction: number | undefined;
  onReaction: (post: Post, reaction: number, spaceId: string) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onPostSelect: () => void;
  loading: boolean;
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

  const handlePostDelete = async () => {
    setError("");
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
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
      >
        <Text fontWeight={"bold"} my={"1"}>
          {post.title}
        </Text>
        <Flex justify={"flex-start"} align={"center"}>
          <Flex align={"center"} justify={"center"}>
            <Icon as={SiEgghead} width={"30px"} height={"30px"} />
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
            onClick={() => {
              onReaction(post, post.reactions, post.spaceId);
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
            <Button
              variant={"unstyled"}
              outline={"1px solid"}
              display={"flex"}
              height={"fit-content"}
              px={"2"}
              isDisabled={loading}
            >
              <Icon as={userReaction !== 1 ? AiOutlineFire : AiTwotoneFire} />
              <Text fontSize={"sm"}>{post.reactions}</Text>
            </Button>
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
