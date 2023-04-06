import { Space, SpaceState, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import {
  Flex,
  Image,
  Text,
  Divider,
  Button,
  Stack,
  Icon,
  Spinner,
  Input,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFileUpload } from "../Hooks/useFileUpload";
import { RiUserSmileFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";

type AboutProps = {
  spaceData: Space;
};

export const About: React.FC<AboutProps> = ({ spaceData }) => {
  const [loading, setLoading] = useState(false);
  const [currentSpace, setCurrentSpace] = useRecoilState(spaceStateAtom);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const imageRef = useRef<HTMLInputElement>(null);

  const { file, setFile, onFileUpload } = useFileUpload();

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
      <Flex
        width={"100%"}
        p={"5px"}
        borderRadius={"5px"}
        mb={"2"}
        bg={"white"}
        flexDir={"column"}
        fontSize={{ base: "xx-small", md: "x-small" }}
        height={"fit-content"}
        border={"1px solid"}
        borderColor={"brand.500"}
      >
        <Flex justify={"space-around"}>
          <Text> About Space</Text>
          {spaceData.createdAt && (
            <Text>
              created:{" "}
              {moment(new Date(spaceData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </Text>
          )}
        </Flex>
        <Divider orientation="horizontal" my={"2"} />
        <Stack>
          <Text>members:{spaceData.numberOfMembers}</Text>
          <Divider />
          {user?.uid === spaceData.creatorId && (
            <>
              <Text fontWeight={"extrabold"}> Mod</Text>
              <Flex width={"100%"} align={"center"} py={"5px"}>
                {spaceData.imageUrl || file ? (
                  <Image
                    src={file || spaceData.imageUrl}
                    width={"35px"}
                    height={"35px"}
                    borderRadius={"full"}
                    alt={"profile picture"}
                    objectFit={"cover"}
                  />
                ) : (
                  <>
                    <Icon as={RiUserSmileFill} width={"35px"} height={"35px"} />
                  </>
                )}

                <Text
                  ml={"5"}
                  onClick={() => {
                    imageRef.current?.click();
                  }}
                  cursor={"pointer"}
                  _hover={{
                    color: "whatsapp.700",
                  }}
                >
                  change space Image
                </Text>
              </Flex>
            </>
          )}
          {file && (
            <>
              <Flex
                align={"center"}
                justify={"center"}
                py={"2"}
                color={"whatsapp.500"}
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
            </>
          )}
          <Input
            type={"file"}
            ref={imageRef}
            display={"none"}
            onChange={onFileUpload}
          />
        </Stack>

        <Flex justify={"center"}>
          <Link href={`/spaces/${spaceData.id}/submit`}>
            <Button size={{ base: "xs", md: "sm" }} isDisabled={!user}>
              {user ? "post on space" : "login to post"}
            </Button>
          </Link>
        </Flex>
        {error && (
          <Alert status="error" display={"flex"} flexDir={"column"}>
            <AlertIcon />
            <AlertTitle>Upload Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Flex>
    </>
  );
};
