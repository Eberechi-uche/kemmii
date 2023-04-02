import { Space, SpaceSnippet, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
  increment,
  getDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/src/firebase/clientApp";
import { authModalState } from "@/src/Atoms/AuthModalAtom";
import { useRouter } from "next/router";
import { Post } from "@/src/Atoms/PostAtom";
import { useSpaceListState } from "./useSpaceListState";

export const useSpaceDataFetch = () => {
  const [spaceValue, setSpaceValue] = useRecoilState(spaceStateAtom);
  const [error, setError] = useState("");
  const setAuthmodalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const route = useRouter();

  const joinSpace = async (spaceData: Space) => {
    setLoading(true);
    const batch = writeBatch(firestore);
    const newSpace: SpaceSnippet = {
      spaceId: spaceData.id,
      imageUrl: spaceData.imageUrl || "",
      isModerator: user!.uid === spaceData.creatorId,
    };
    try {
      batch.set(
        doc(firestore, `users/${user?.uid}/spaceSnippet`, spaceData.id),
        newSpace
      );
      batch.update(doc(firestore, `spaces`, spaceData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();
      setSpaceValue((prev) => ({
        ...prev,
        mySpaces: [...prev.mySpaces, newSpace],
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveSpace = async (spaceId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      batch.delete(doc(firestore, `users/${user?.uid}/spaceSnippet`, spaceId));

      batch.update(doc(firestore, "spaces", spaceId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      const updateSpace = spaceValue.mySpaces.filter(
        (space) => space.spaceId !== spaceId
      );
      setSpaceValue((prev) => ({
        ...prev,
        mySpaces: updateSpace,
      }));
    } catch (error: any) {
      setError(error.message);
      console.log("leave space", error.message);
    }
    setLoading(false);
  };

  const getSpaceSnippet = async () => {
    setLoading(true);
    try {
      const snippetDoc = await getDocs(
        collection(firestore, `users/${user?.uid}/spaceSnippet`)
      );

      const snippets = snippetDoc.docs.map((doc) => ({ ...doc.data() }));
      setSpaceValue((prev) => ({
        ...prev,
        mySpaces: snippets as Array<SpaceSnippet>,
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };
  const getSpaceInfo = async (spaceID: string) => {
    const spaceRef = doc(firestore, "spaces", `${spaceID}`);
    const spaceDoc = await getDoc(spaceRef);
    setSpaceValue((prev) => ({
      ...prev,
      currentSpace: { id: spaceDoc.id, ...spaceDoc.data() } as Space,
    }));
    try {
    } catch (error: any) {
      setError(error.message);
    }
  };
  const onSpaceJoinOrLeave = (space: Space, isMember: boolean) => {
    // TODO check if user is signed in,
    if (!user) {
      setAuthmodalState((prev) => ({
        open: true,
        view: "log in",
      }));
      return;
    }
    // !if not open sign in modal
    if (isMember) {
      leaveSpace(space.id);
      return;
    }
    joinSpace(space);
  };
  useEffect(() => {
    if (!user) {
      setSpaceValue((prev) => ({
        ...prev,
        mySpaces: [],
      }));
      return;
    }
    getSpaceSnippet();
  }, [user]);

  useEffect(() => {
    const { spaceid } = route.query;
    if (spaceid && !spaceValue.currentSpace) {
      getSpaceInfo(spaceid as string);
    }
  }, [route.query, spaceValue.currentSpace]);

  return {
    spaceValue,
    onSpaceJoinOrLeave,
    loading,
  };
};
