import { firestore } from "@/src/firebase/clientApp";
import { Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { Space } from "@/src/Atoms/spacesAtom";
import safeJsonStringify from "safe-json-stringify";
import { GetServerSidePropsContext } from "next";
import NotFound from "@/src/components/Spaces.component.tsx/NotFound";
import { Header } from "@/src/components/Spaces.component.tsx/Header.spaces";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { CreatePostLink } from "@/src/components/Spaces.component.tsx/CreatePostLink";
import { useSpaceDataFetch } from "@/src/components/Hooks/useSpaceDataFetch";

type spacePageProps = {
  spaceData: Space;
};

const SpacePage: React.FC<spacePageProps> = ({ spaceData }) => {
  if (!spaceData) {
    return <NotFound />;
  }
  return (
    <div>
      <Header spacesData={spaceData} />
      <PageContentLayout>
        <>
          <CreatePostLink />
        </>
        <>
          <div>right or top</div>
        </>
      </PageContentLayout>
    </div>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const spaceRef = doc(firestore, "spaces", context.query.spaceid as string);
    const spaceDocData = await getDoc(spaceRef);
    return {
      props: {
        spaceData: spaceDocData.exists()
          ? JSON.parse(
              safeJsonStringify({ id: spaceDocData.id, ...spaceDocData.data() })
            )
          : "",
      },
    };
  } catch (error) {}
}
export default SpacePage;
