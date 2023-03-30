import { useRecoilState } from "recoil";
import { Post, postState } from "@/src/Atoms/PostAtom";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "@/src/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";

export const usePostData = () => {
  const [postData, setPostData] = useRecoilState(postState);
  const onReaction = () => {};
  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageUrl) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);
      setPostData((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
    } catch (error) {
      return false;
    }
    return true;
  };
  const onPostSelect = () => {};
  return {
    postData,
    setPostData,
    onReaction,
    onDeletePost,
    onPostSelect,
  };
};
