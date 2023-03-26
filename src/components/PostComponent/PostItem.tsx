import { Post } from "@/src/Atoms/PostAtom";
import { Flex, Text, Image, Stack, Icon, Divider } from "@chakra-ui/react";
import { SiEgghead } from "react-icons/si";
import { AiOutlineFire, AiTwotoneFire } from "react-icons/ai";
import { HiChatBubbleBottomCenterText, HiOutlineXMark } from "react-icons/hi2";
import moment from "moment";
import { useState } from "react";
import { Loading } from "../animations/Loading";
type PostItemProps = {
  post: Post;
  userIsCreator?: boolean;
  userReaction?: number;
  onReaction?: () => void;
  onDeletePost?: () => void;
  onPostSelect?: () => void;
};

export const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userReaction,
  onReaction,
  onDeletePost,
  onPostSelect,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
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
                size={"200px"}
              />
            )}
            <Image
              src={post.imageUrl}
              alt={post.creatorDisplayName}
              maxH={"200px"}
              maxW={"300px"}
              objectFit={"cover"}
              borderRadius={"10px"}
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
            onClick={onReaction}
            cursor={"pointer"}
            mx={"3"}
            _hover={{
              backgroundColor: "whatsapp.100",
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
            onClick={onReaction}
            cursor={"pointer"}
            mx={"3"}
            _hover={{
              backgroundColor: "whatsapp.100",
              color: "white",
            }}
            p={"3px 7px"}
            borderRadius={"5px"}
          >
            <Icon as={userReaction === 1 ? AiTwotoneFire : AiOutlineFire} />
            <Text fontSize={"sm"}>{post.reactions}</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align={"center"}
              onClick={onDeletePost}
              cursor={"pointer"}
              mx={"3"}
              _hover={{
                backgroundColor: "whatsapp.100",
                color: "white",
              }}
              p={"3px 7px"}
              borderRadius={"5px"}
            >
              <Icon as={HiOutlineXMark} />
              <Text fontSize={"sm"}>delete</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
