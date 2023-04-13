import { Post } from "@/src/Atoms/PostAtom";
import { Flex, Icon, Box, Text } from "@chakra-ui/react";
import { BsChat } from "react-icons/bs";
import { FiTrendingUp } from "react-icons/fi";

type NewPostProps = {
  post: Post;
  onPostSelect: (post: Post) => void;
};
export const NewPost: React.FC<NewPostProps> = ({ post, onPostSelect }) => {
  return (
    <>
      <Box
        width={"120px"}
        height={"150px"}
        bg={"whatsapp.500"}
        px={"2"}
        backgroundPosition={"center"}
        backgroundSize={"cover"}
        color={"white"}
        bgImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , ${
          post.imageUrl && `url(${post.imageUrl})`
        }`}
        mx={"1"}
        onClick={() => {
          onPostSelect(post);
        }}
        cursor={"pointer"}
      >
        <Flex flexDir={"column"} justify={"space-between"} height={"100%"}>
          <Text fontWeight={"700"} fontSize={"sm"}>
            {post.title}
          </Text>
          <Text noOfLines={[3, 5]} fontSize={"xs"}>
            {post.body}
          </Text>
          <Flex align={"center"} my={"2"}>
            <Icon as={BsChat} />
            <Text>{post.numberOfComments}</Text>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

type NewPostLayoutProps = {
  children: React.ReactNode;
  heading: string;
};
export const NewPostLayout: React.FC<NewPostLayoutProps> = ({
  children,
  heading,
}) => {
  return (
    <>
      <Text
        align={"center"}
        fontWeight={"900"}
        fontSize={"lg"}
        alignSelf={"flex-start"}
      >
        {heading}
        <Icon as={FiTrendingUp} />
      </Text>
      <Flex
        width={"100%"}
        px={"1"}
        py={"2"}
        overflowX={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        scrollBehavior={"smooth"}
      >
        <Flex flexDir={"column"}>
          <Flex>{children}</Flex>
        </Flex>
      </Flex>
    </>
  );
};
