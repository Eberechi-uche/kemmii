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

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
}
const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
};

export const PostState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
