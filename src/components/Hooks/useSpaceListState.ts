import { spaceListAtom, SpaceListItem } from "@/src/Atoms/spaceListMenuAtom";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useSpaceDataFetch } from "./useSpaceDataFetch";

export const useSpaceListState = () => {
  const route = useRouter();
  const [spaceListState, setSpaceListState] = useRecoilState(spaceListAtom);
  const { spaceValue } = useSpaceDataFetch();

  const onSpaceSelect = (space: SpaceListItem) => {
    route.push(space.link);
    setSpaceListState({ selectedSpace: space, isOpen: false });
  };
  const toggleSpaceListMenu = () => {
    setSpaceListState((prev) => ({
      ...prev,
      isOpen: !spaceListState.isOpen,
    }));
    return;
  };
  useEffect(() => {
    if (spaceValue.currentSpace) {
      setSpaceListState((prev) => ({
        ...prev,
        selectedSpace: {
          imageUrl: spaceValue.currentSpace?.imageUrl,
          link: `/spaces/${spaceValue.currentSpace?.id}`,
          displayText: spaceValue.currentSpace!.id,
        },
      }));
    }
  }, [spaceValue.currentSpace, setSpaceListState]);

  return {
    spaceListState,
    toggleSpaceListMenu,
    onSpaceSelect,
    setSpaceListState,
  };
};
