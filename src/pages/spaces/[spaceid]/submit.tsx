import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { NewPostForm } from "@/src/components/PostComponent/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import NoUserSignIn from "@/src/components/modal/Auth/NoUser";

const SubmitPost: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <PageContentLayout>
        <>{user ? <NewPostForm user={user} /> : <NoUserSignIn />}</>

        <></>
      </PageContentLayout>
    </>
  );
};
export default SubmitPost;
