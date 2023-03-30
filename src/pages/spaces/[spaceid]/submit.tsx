import { Text } from "@chakra-ui/react";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { NewPostForm } from "@/src/components/PostComponent/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { spaceStateAtom } from "@/src/Atoms/spacesAtom";
import { About } from "@/src/components/Spaces.component.tsx/About";

const SubmitPost: React.FC = () => {
  const [user] = useAuthState(auth);
  const spaceDataValue = useRecoilValue(spaceStateAtom);

  return (
    <>
      <PageContentLayout>
        <>{user && <NewPostForm user={user} />}</>
        <>
          <About spaceData={spaceDataValue.currentSpace!} />
        </>
      </PageContentLayout>
    </>
  );
};
export default SubmitPost;
