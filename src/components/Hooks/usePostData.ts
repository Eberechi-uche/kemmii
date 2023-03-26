import { useRecoilState } from "recoil";
import { postState } from "@/src/Atoms/PostAtom";

export const usePostData = () => {
  const [postData, setPostData] = useRecoilState(postState);
  const onReaction = () => {};
  const onDeletePost = () => {};
  const onPostSelect = () => {};
  return {
    postData,
    setPostData,
    onReaction,
    onDeletePost,
    onPostSelect,
  };
};
