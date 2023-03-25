import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  Flex,
  Box,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { MdOutlinePublic, MdRocketLaunch } from "react-icons/md";
import { RiChatPrivateFill } from "react-icons/ri";
import { BiHide } from "react-icons/bi";
import { useState } from "react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/src/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../../animations/Loading";

type createSpaceModalProps = {
  active: boolean;
  setActive: () => void;
};

export const CreateSpaceModal: React.FC<createSpaceModalProps> = ({
  active,
  setActive,
}) => {
  const [spaceName, setSpaceName] = useState("");
  const [spaceType, setSpaceType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSpaceName(e.target.value);
  };
  const handleCheckSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSpaceType(e.target.name);
  };
  const handleSpaceCreation = async () => {
    setError("");
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(spaceName) || spaceName.length < 3) {
      setError(
        "spaceType should be have more than 3 characters and can only have numbers, letters, and hyphens"
      );
      return;
    }

    try {
      setLoading(true);
      const spaceDocRef = doc(firestore, "spaces", spaceName);

      await runTransaction(firestore, async (transaction) => {
        const spaceDoc = await transaction.get(spaceDocRef);
        if (spaceDoc.exists()) {
          throw new Error(
            ` another space with name /${spaceName}/ already exist, try another one`
          );
        }
        // create spaces
        transaction.set(spaceDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMember: 1,
          privacyType: spaceType,
        });
        // add user to the space and make moderator
        transaction.set(
          doc(firestore, `users/${user?.uid}/spaceSnippet`, spaceName),
          {
            spaceId: spaceName,
            isModerator: true,
          }
        );
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      console.log("handleCreateSpace", error.message);
    }
  };

  return (
    <Modal isOpen={active} onClose={setActive} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"whatsapp.600"}>
          {!loading ? (
            "Create your space"
          ) : (
            <Flex align={"center"}>
              <Text>
                creating Space <Icon as={MdRocketLaunch} />
              </Text>
            </Flex>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"grid"} placeItems={"start"}>
          {loading && (
            <Loading
              link={
                "https://media.tenor.com/6Tc-POkXDgYAAAAC/epic-rick-and-morty.gif"
              }
            />
          )}
          {!loading && (
            <>
              <Text>Enter the name of the spaceType you want to create</Text>
              <Input
                bg={"whatsapp.500"}
                focusBorderColor={"whatsapp.500"}
                mt={"5"}
                borderRadius={"full"}
                maxLength={30}
                color={"white"}
                onChange={handleInputChange}
              />
              {error.length > 2 && (
                <Text color={"red.500"} fontSize={"xs"}>
                  {error}
                </Text>
              )}

              <Box display={"flex"} flexDir={"column"} pt={"10"}>
                <Checkbox
                  name="public"
                  isChecked={spaceType === "public"}
                  onChange={handleCheckSelection}
                  size={"lg"}
                  colorScheme={"green"}
                  css={`
                    > span:first-of-type {
                      box-shadow: unset;
                    }
                  `}
                >
                  <Flex align={"center"}>
                    <Icon as={MdOutlinePublic} />
                    <Text ml={"2"}>Public</Text>
                    <Text fontSize={"x-small"} ml={"5"}>
                      everyone can view and post
                    </Text>
                  </Flex>
                </Checkbox>

                <Checkbox
                  name="private"
                  isChecked={spaceType === "private"}
                  onChange={handleCheckSelection}
                  size={"lg"}
                  colorScheme={"green"}
                  css={`
                    > span:first-of-type {
                      box-shadow: unset;
                    }
                  `}
                >
                  <Flex align={"center"}>
                    <Icon as={RiChatPrivateFill} />
                    <Text ml={"2"}>Private</Text>
                    <Text fontSize={"x-small"} ml={"5"}>
                      everyone can view and comment but cannot post
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="restricted"
                  isChecked={spaceType === "restricted"}
                  onChange={handleCheckSelection}
                  size={"lg"}
                  colorScheme={"green"}
                  css={`
                    > span:first-of-type {
                      box-shadow: unset;
                    }
                  `}
                >
                  <Flex align={"center"}>
                    <Icon as={BiHide} />
                    <Text ml={"2"}>Restricted</Text>
                    <Text fontSize={"x-small"} ml={"5"}>
                      only approved users can view it and post
                    </Text>
                  </Flex>
                </Checkbox>
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={setActive}
            variant={"outline"}
          >
            cancel
          </Button>
          <Button
            width={"xs"}
            onClick={handleSpaceCreation}
            isLoading={loading}
          >
            create space
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
