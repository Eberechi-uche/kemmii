import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Space {
  id: string;
  creatorId: string;
  numberOfMembers?: number;
  privacyType?: "public" | "private" | "restricted";
  createdAt?: Timestamp;
  imageUrl?: string;
  vibe?: string | string[];
  desc: "";
  rules: "";
}
export interface SpaceSnippet {
  spaceId: string;
  isModerator?: boolean;
  imageUrl?: string;
}

export interface SpaceState {
  mySpaces: SpaceSnippet[];
  currentSpace?: Space;
  snippetFetched: boolean;
}
const defaultSpaceState: SpaceState = {
  mySpaces: [],
  snippetFetched: false,
};
export const spaceStateAtom = atom<SpaceState>({
  key: "SpaceState",
  default: defaultSpaceState,
});
