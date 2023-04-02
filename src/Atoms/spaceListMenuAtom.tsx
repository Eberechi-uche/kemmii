import { IconType } from "react-icons";
import { MdWorkspacesFilled } from "react-icons/md";
import { atom } from "recoil";

export type SpaceListItem = {
  imageUrl?: string | undefined;
  link: string;
  displayText: string;
};

interface SpaceListMenuState {
  selectedSpace: SpaceListItem;
  isOpen: boolean;
}
export const defaultSPaceListMenuItem: SpaceListItem = {
  displayText: "home",
  link: "/",
};
export const defaultSpaceListMenuState: SpaceListMenuState = {
  selectedSpace: defaultSPaceListMenuItem,
  isOpen: false,
};
export const spaceListAtom = atom<SpaceListMenuState>({
  key: "spaceListMenu",
  default: defaultSpaceListMenuState,
});