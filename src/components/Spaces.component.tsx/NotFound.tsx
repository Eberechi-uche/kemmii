import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
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
      <Link href={`/`}>
        <Button>home</Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
