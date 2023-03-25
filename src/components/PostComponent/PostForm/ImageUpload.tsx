import { Flex, Image, Icon, Input, Text, Box, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { TabItems } from "../NewPostForm";

type ImageUploadProps = {
  fileSelected?: string;
  setActiveTab: (value: string) => void;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  fileSelected,
  setSelectedFile,
  onUpload: onUplaod,
  setActiveTab,
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  return (
    <Flex
      justify={"center"}
      align={"center"}
      border={"2px dashed"}
      minH={"200px"}
      borderColor={"whatsapp.500"}
      overflow={"hidden"}
      m={"10px 10px"}
    >
      <Flex align={"center"}>
        {fileSelected ? (
          <ImagePreview
            fileSelected={fileSelected}
            setSelectedFile={setSelectedFile}
            setActiveTab={setActiveTab}
          />
        ) : (
          <>
            <Icon
              as={RiImageAddFill}
              fontSize={"5xl"}
              color={"whatsapp.500"}
              onClick={() => {
                inputElement.current?.click();
              }}
            />
            <Input
              type={"file"}
              ref={inputElement}
              hidden
              onChange={onUplaod}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};

type ImagePreviewProps = {
  setSelectedFile: (value: string) => void;
  fileSelected?: string;
  setActiveTab: (value: string) => void;
};
export const ImagePreview: React.FC<ImagePreviewProps> = ({
  fileSelected,
  setSelectedFile,
  setActiveTab,
}) => {
  return (
    <>
      <Flex flexDir={"column"} justify={"center"} align={"center"} p={"5px"}>
        <Image
          src={fileSelected}
          alt="upload"
          objectFit={"contain"}
          width={"200px"}
          height={"200px"}
        />
        <Flex>
          <Button
            size={{ base: "xs", md: "sm" }}
            onClick={() => {
              setSelectedFile("");
            }}
          >
            cancel
          </Button>
          <Button
            size={{ base: "xs", md: "sm" }}
            onClick={() => {
              setActiveTab("Post");
            }}
          >
            {" "}
            done
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
