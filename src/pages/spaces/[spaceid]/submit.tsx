import { Text } from "@chakra-ui/react";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { NewPostForm } from "@/src/components/PostComponent/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { About } from "@/src/components/Spaces.component.tsx/About";
import { useSpaceDataFetch } from "@/src/components/Hooks/useSpaceDataFetch";
import { UserProfile } from "@/src/components/UserProfile/UserProfile";

const SubmitPost: React.FC = () => {
  const [user] = useAuthState(auth);
  // const spaceDataValue = useRecoilValue(spaceStateAtom);
  const { spaceValue } = useSpaceDataFetch();

  return (
    <>
      <PageContentLayout>
        {/* <>{user && <NewPostForm user={user} />}</> */}
        <UserProfile />

        <></>
      </PageContentLayout>
    </>
  );
};
export default SubmitPost;
