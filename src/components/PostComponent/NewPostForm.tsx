import { BsImage, BsFillChatSquareDotsFill } from "react-icons/bs";
import {
  Icon,
  Flex,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { TabItem } from "./PostTabItems";
import { useState } from "react";
import { TextInput, TextInputProp } from "./PostForm/TextInput";
import { ImageUpload } from "./PostForm/ImageUpload";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { Post } from "@/src/Atoms/PostAtom";
import {
  addDoc,
  serverTimestamp,
  Timestamp,
  collection,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/src/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useFileUpload } from "../Hooks/useFileUpload";

type NewPostFormProps = {
  user: User;
};
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
export const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const [activeTab, setActivetab] = useState(formTabs[0].title);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    title: "",
    body: "",
  });

  const { file, setFile, onFileUpload } = useFileUpload();

  const router = useRouter();

  const onPostSubmit = async () => {
    setError("");
    const { spaceid } = router.query;
    const newPost: Post = {
      spaceId: spaceid as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: input.title,
      body: input.body,
      numberOfComments: 0,
      reactions: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      // get doc refrence,
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (file) {
        const ImageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(ImageRef, file, "data_url");
        const downloadUrl = await getDownloadURL(ImageRef);
        await updateDoc(postDocRef, {
          imageUrl: downloadUrl,
        });
      }
      router.back();
    } catch (error: any) {
      console.log("onPostSubmit", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

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
              setSelectedFile={setFile}
              fileSelected={file}
              setActiveTab={setActivetab}
            />
          )}
        </Flex>
        {error && (
          <Alert
            status="error"
            flexDir={"column"}
            fontSize={{ base: "xs", md: "sm" }}
          >
            <AlertIcon />
            <AlertTitle>Error Creating post</AlertTitle>
            <AlertDescription>please try again</AlertDescription>
          </Alert>
        )}
      </Flex>
    </>
  );
};
