import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  spaceImageUrl?: string;
  spaceId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  reactions: number;
  imageUrl?: string;
  createdAt: Timestamp;
};
export type Reaction = {
  id: string;
  postId: string;
  spaceId: string;
  reactionValue: number;
};

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  reactions: Reaction[];
}
const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  reactions: [],
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
