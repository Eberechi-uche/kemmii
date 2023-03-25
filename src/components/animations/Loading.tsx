import { Image } from "@chakra-ui/react";

interface image {
  link: string;
}

export const Loading = ({ link }: image) => {
  return (
    <>
      <Image src={link} alt="loading-img" borderRadius={"5px"} />
    </>
  );
};
