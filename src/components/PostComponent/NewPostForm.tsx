import { BsImage, BsFillChatSquareDotsFill } from "react-icons/bs";
import { Icon, Flex } from "@chakra-ui/react";
import { TabItem } from "./PostTabItems";
import { useState } from "react";
import { TextInput, TextInputProp } from "./PostForm/TextInput";
import { ImageUpload } from "./PostForm/ImageUpload";

interface FormTabs {}
const formTabs: TabItems[] = [
  { title: "Post", icon: BsFillChatSquareDotsFill },
  {
    title: "image or gif",
    icon: BsImage,
  },
];
export type TabItems = {
  title: string;
  icon: typeof Icon.arguments;
};
export const NewPostForm: React.FC = () => {
  const [activeTab, setActivetab] = useState(formTabs[0].title);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const onPostSubmit = () => {};
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = new FileReader();
    if (event.target.files?.[0]) {
      file.readAsDataURL(event.target.files[0]);
    }
    file.onload = (loadEvent) => {
      if (loadEvent.target?.result) {
        setSelectedFile(loadEvent.target.result as string);
      }
    };
  };
  return (
    <>
      <Flex
        width={"100%"}
        bg={"white"}
        borderTopRadius={"5px"}
        flexDir={"column"}
      >
        <Flex>
          {formTabs.map((element, index) => (
            <TabItem
              key={index}
              item={element}
              isActive={element.title === activeTab}
              setActive={setActivetab}
            />
          ))}
        </Flex>
        {/* POST TAB*/}
        <Flex p={2} width={"100%"} flexDir={"column"}>
          {activeTab === formTabs[0].title && (
            <TextInput
              TextInput={input}
              onChange={onInputChange}
              handleSubmit={onPostSubmit}
              loading={loading}
            />
          )}
          {activeTab === formTabs[1].title && (
            <ImageUpload
              onUpload={onFileUpload}
              setSelectedFile={setSelectedFile}
              fileSelected={selectedFile}
              setActiveTab={setActivetab}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};
