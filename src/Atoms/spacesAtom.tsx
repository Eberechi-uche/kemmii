import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Space {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "private" | "restricted";
  createdAt?: Timestamp;
  imageUrl?: string;
  vibe?: string | string[];
}
export interface SpaceSnippet {
  SpaceId: string;
  isModerator?: boolean;
  imageUrl?: string;
}

export interface SpaceState {
  mySpaces: SpaceSnippet[];
}
const defaultSpaceState: SpaceState = {
  mySpaces: [],
};
export const SpaceSnippet = atom<SpaceState>({
  key: "SpaceState",
  default: defaultSpaceState,
});
