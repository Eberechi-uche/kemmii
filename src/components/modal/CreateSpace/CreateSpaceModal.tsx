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
  Flex,
  AlertIcon,
  Icon,
  Alert,
} from "@chakra-ui/react";
import { MdRocketLaunch } from "react-icons/md";

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

import { CreateSpaceFlow } from "./CreateSpaceFlow";
import { useRouter } from "next/router";

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

  const router = useRouter();
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
          numberOfMembers: 1,
          privacyType: spaceType,
          imageUrl: "",
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

    setActive();
    router.push(`/spaces/${spaceName}`);
  };

  return (
    <Modal isOpen={active} onClose={setActive} size={{ base: "xs", md: "sm" }}>
      <ModalOverlay />
      <ModalContent fontSize={{ base: "xs", md: "md" }}>
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
          <CreateSpaceFlow
            handleCheckSelection={handleCheckSelection}
            handleInputChange={handleInputChange}
            error={error}
            spaceType={spaceType}
            loading={loading}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={setActive}
            variant={"outline"}
            size={{ base: "xs", md: "sm" }}
          >
            cancel
          </Button>
          <Button
            width={"100%"}
            onClick={handleSpaceCreation}
            isLoading={loading}
            size={{ base: "xs", md: "sm" }}
            isDisabled={spaceName.length < 3}
          >
            create space
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
