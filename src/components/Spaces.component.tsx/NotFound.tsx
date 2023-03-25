import { Button, Flex, Text } from "@chakra-ui/react";
import PageNotFound from "../animations/PageNotFound";

const NotFound: React.FC = () => {
  return (
    <Flex
      width={"100vw"}
      h={"80vh"}
      justify={"center"}
      align={"center"}
      flexDir={"column"}
    >
      <PageNotFound />
      <Text letterSpacing={"widest"} fontSize={"20pt"} color={"whatsapp.500"}>
        space not found
      </Text>
      <img
        src="https://media.tenor.com/6Tc-POkXDgYAAAAC/epic-rick-and-morty.gif"
        alt="not found"
      />
      <Button>home</Button>
    </Flex>
  );
};

export default NotFound;
