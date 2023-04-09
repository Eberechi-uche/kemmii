import { updateProfile, User } from "firebase/auth";
import {
  Text,
  Input,
  Flex,
  Image,
  Button,
  Box,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { createAvatar } from "@dicebear/core";
import { useMemo, useState } from "react";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { adventurer, notionists, openPeeps } from "@dicebear/collection";
import { auth, storage } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Loading } from "../animations/Loading";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/Atoms/AuthModalAtom";

type UserProfileProps = {
  user: User;
};
interface UpdateProfile {
  photoURL?: string;
  displayName?: string;
}
export const UserProfile: React.FC = () => {
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("input");
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  const route = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleProfileUpdate = async (photo: any) => {
    setLoading(true);
    const updateField: UpdateProfile = {};

    try {
      if (photo) {
        const imageRef = ref(storage, `profilePicture/${user?.uid}/image`);
        await uploadString(imageRef, photo, "data_url");
        const downloadUrl = await getDownloadURL(imageRef);
        updateField.photoURL = downloadUrl;
      }
      if (name) {
        updateField.displayName = name;
      }
      await updateProfile(user!, updateField);
    } catch (error: any) {
      console.log("update", error.message);
      setLoading(false);
    }
    setLoading(false);
    setAuthModalState((prev) => ({
      ...prev,
      open: false,
    }));
    route.push(`/`);
  };

  return (
    <>
      <Flex flexDir={"column"} textAlign={"center"}>
        {loading && (
          <Loading
            link={
              "https://assets4.lottiefiles.com/private_files/lf30_amhtk28o.json"
            }
            speed={2}
            size={200}
          />
        )}
        {!loading && activeTab === "input" && (
          <>
            <Image
              alt={"profile"}
              boxSize={"80px"}
              src={user?.photoURL ? user.photoURL : "/images/default.png"}
              alignSelf={"center"}
            />
            {user?.displayName ? (
              <Text> hello {user.displayName}</Text>
            ) : (
              <Text>
                hello, lets get to know you, enter you display name and click
                proceed to create your profile picture
              </Text>
            )}

            <Grid
              height={"30vh"}
              placeContent={"center"}
              width={"100%"}
              justifyContent={"center"}
              placeItems={"center"}
              position={"relative"}
            >
              <Text
                mb={"5"}
                fontWeight={"700"}
                position={"absolute"}
                bottom={"70%"}
              >
                {name}
              </Text>
              <Input
                onChange={(e) => {
                  handleInputChange(e);
                }}
                maxLength={10}
                placeholder={"display name"}
                maxW={"80%"}
                borderRadius={"full"}
              />
              <Text
                mt={"5"}
                display={"flex"}
                alignItems={"center"}
                cursor={"pointer"}
                onClick={() => {
                  setActiveTab("avatarPicker");
                }}
              >
                <Icon as={IoArrowForwardCircleOutline} mr={"2"} />
                proceed to generate your avatar
              </Text>
            </Grid>
          </>
        )}
        {!loading && activeTab == "avatarPicker" && (
          <AvatarPicker
            setActiveTab={setActiveTab}
            handleProfileUpdate={handleProfileUpdate}
          />
        )}
      </Flex>
    </>
  );
};

type AvatarPickerProps = {
  setActiveTab: (tab: string) => void;
  handleProfileUpdate: (photo: string) => void;
};

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  setActiveTab,
  handleProfileUpdate,
}) => {
  const [avatarStyle, setAvatarStyle] = useState<any>(adventurer);
  const [useAvatar, setUseAvatar] = useState("");
  const orientation = avatarStyle === adventurer ? true : false;

  const genAvatar = useMemo(() => {
    return createAvatar(avatarStyle, {
      size: 128,
      flip: orientation,
      backgroundColor: ["ffdfbf", "ffd5dc", "d1d4f9", "c0aede", "b6e3f4"],
      seed: useAvatar,
    }).toDataUriSync();
  }, [useAvatar]);
  return (
    <>
      <Flex
        width={"100%"}
        justify={"space-evenly"}
        align={"center"}
        height={"fit-content"}
      >
        <Box pb={"2"}>
          <Image
            alt={"male"}
            src="/images/female.png"
            boxSize={"50px"}
            borderRadius={"full"}
            objectFit={"cover"}
            border={`2px solid ${
              avatarStyle === adventurer ? "green" : "blue.500"
            }`}
            onClick={() => {
              setAvatarStyle(adventurer);
            }}
          />
        </Box>

        <Image
          alt={"notorios"}
          src="/images/male.png"
          boxSize={"50px"}
          borderRadius={"full"}
          objectFit={"cover"}
          border={`2px solid ${
            avatarStyle === notionists ? "green" : "blue.500"
          }`}
          onClick={() => {
            setAvatarStyle(notionists);
          }}
        />
        <Image
          alt={"notorios"}
          src="/images/openpeeps.png"
          boxSize={"50px"}
          borderRadius={"full"}
          objectFit={"cover"}
          border={`2px solid ${
            avatarStyle === openPeeps ? "green" : "blue.500"
          }`}
          onClick={() => {
            setAvatarStyle(openPeeps);
          }}
        />
      </Flex>
      <Image
        src={genAvatar}
        alt="Avatar"
        boxSize={"300px"}
        borderRadius={"full"}
      />
      <Flex justify={"center"}>
        <Button
          onClick={() => {
            const result = Math.random().toString(36).substring(2, 7);
            setUseAvatar(result);
          }}
        >
          generate
        </Button>
        <Button
          onClick={() => {
            handleProfileUpdate(genAvatar);
          }}
        >
          select
        </Button>
      </Flex>
      <Text
        mt={"5"}
        display={"flex"}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={() => {
          setActiveTab("input");
        }}
      >
        <Icon as={IoArrowBackCircleOutline} mr={"2"} />
        go back
      </Text>
    </>
  );
};
