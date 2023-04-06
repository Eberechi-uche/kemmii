import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

export const PageContentLayout: React.FC<PageContentProps> = ({ children }) => {
  return (
    <>
      <Flex justify={"center"}>
        <Flex
          justify={"center"}
          width={"100%"}
          maxWidth={"760"}
          direction={{ base: "column-reverse", md: "row" }}
          mt={"20px"}
          mx={"10px"}
        >
          <Flex
            direction={"column"}
            mr={"10px"}
            width={{ base: "100%", md: "70%" }}
          >
            {children && children[0 as keyof typeof children]}
          </Flex>
          <Flex flexGrow={"1"} display={{ base: "none", md: "unset" }}>
            {children && children[1 as keyof typeof children]}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
