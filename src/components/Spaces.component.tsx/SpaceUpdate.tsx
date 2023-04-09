import { Space, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { useFileUpload } from "@/src/components/Hooks/useFileUpload";
import { auth, storage, firestore } from "@/src/firebase/clientApp";
import {
  Flex,
  Textarea,
  Text,
  Input,
  Icon,
  Spinner,
  Image,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { TbPhotoUp } from "react-icons/tb";
import { BiBorderRadius } from "react-icons/bi";

type UpdateSpaceProps = {
  spaceData: Space;
};

export const UpdateSpace: React.FC<UpdateSpaceProps> = ({ spaceData }) => {
  const [loading, setLoading] = useState(false);
  const [currentSpace, setCurrentSpace] = useRecoilState(spaceStateAtom);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const imageRef = useRef<HTMLInputElement>(null);

  const { file, setFile, onFileUpload } = useFileUpload();

  const handleDescUpdate = async () => {
    setError("");
    setLoading(true);
    if (text.length > 100) {
      setError(" space description should not exceed 150 words");
      setLoading(false);

      return;
    }
    try {
      await updateDoc(doc(firestore, "spaces", spaceData.id), {
        desc: text,
      });
      setCurrentSpace((prev) => ({
        ...prev,
        currentSpace: {
          ...prev.currentSpace,
          desc: text,
        } as Space,
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
    setText("");
  };
  const handleSpaceImageUpdate = async () => {
    if (file && file.length / 1024 > 150) {
      setError(
        "file too large, should not be more than 100K consider compressing it"
      );
      return;
    }
    setLoading(true);
    try {
      const imageRef = ref(storage, `spaces/${spaceData.id}/image`);
      await uploadString(imageRef, file, "data_url");
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(firestore, "spaces", spaceData.id), {
        imageUrl: downloadUrl,
      });
      await updateDoc(
        doc(firestore, `users/${user?.uid}/spaceSnippet/${spaceData.id}`),
        {
          imageUrl: downloadUrl,
        }
      );
      setCurrentSpace((prev) => ({
        ...prev,
        currentSpace: {
          ...prev.currentSpace,
          imageUrl: downloadUrl,
        } as Space,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
    setFile("");
  };
  return (
    <>
      <Flex flexDir={"column"}>
        <Text textAlign={"center"}>{spaceData.desc}</Text>

        {spaceData.creatorId === user?.uid && (
          <>
            <Flex
              flexDir={"column"}
              bg={"white"}
              borderRadius={"10px"}
              my={"2"}
            >
              <Textarea
                px={"2"}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  e.preventDefault();
                  setText(e.target.value);
                }}
                bg={"white"}
                variant={"flushed"}
                border={"none"}
                placeholder={"enter space description"}
                value={text}
                maxWidth={"80%"}
                alignSelf={"center"}
                focusBorderColor={"white"}
              />
              <Button
                width={"20%"}
                placeSelf={"end"}
                isDisabled={text.length < 5}
                onClick={handleDescUpdate}
                isLoading={loading}
              >
                update
              </Button>
            </Flex>
          </>
        )}

        {spaceData.creatorId === user?.uid && (
          <Flex
            align={"center"}
            onClick={() => {
              imageRef.current?.click();
            }}
            cursor={"pointer"}
            color={"brand.500"}
          >
            <Input
              type={"file"}
              ref={imageRef}
              display={"none"}
              onChange={onFileUpload}
            />

            <Icon as={TbPhotoUp} fontSize={"30px"} />
            <Text>update space image</Text>
          </Flex>
        )}

        {file && (
          <Flex flexDir={"column"} align={"center"}>
            <Image
              src={file}
              boxSize={"140px"}
              borderRadius={"full"}
              alt={"image preview"}
            />
            <Flex
              align={"center"}
              justify={"center"}
              py={"2"}
              color={"brand.500"}
            >
              {file && loading ? (
                <Spinner size={{ base: "xs", md: "sm" }} />
              ) : (
                <>
                  <Text
                    m="5"
                    onClick={handleSpaceImageUpdate}
                    fontSize={"10pt"}
                    hidden={error ? true : false}
                  >
                    update
                  </Text>
                  <Text
                    onClick={() => {
                      setFile("");
                      setError("");
                    }}
                    fontSize={"10pt"}
                  >
                    cancel
                  </Text>
                </>
              )}
            </Flex>
          </Flex>
        )}
        <Text>space type: {spaceData.privacyType}</Text>
        {error && (
          <Alert status="error" display={"flex"} flexDir={"column"}>
            <AlertIcon />
            <AlertTitle>Update Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Flex>
    </>
  );
};
