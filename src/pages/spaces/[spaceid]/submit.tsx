import { Text } from "@chakra-ui/react";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { NewPostForm } from "@/src/components/PostComponent/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
const SubmitPost: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <PageContentLayout>
        <>{user && <NewPostForm user={user} />}</>
        <> left</>
      </PageContentLayout>
    </>
  );
};
export default SubmitPost;
