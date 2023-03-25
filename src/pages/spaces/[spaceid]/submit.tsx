import { Text } from "@chakra-ui/react";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { NewPostForm } from "@/src/components/PostComponent/NewPostForm";
const SubmitPost: React.FC = () => {
  return (
    <>
      <PageContentLayout>
        <>
          <NewPostForm />
        </>
        <> left</>
      </PageContentLayout>
    </>
  );
};
export default SubmitPost;
