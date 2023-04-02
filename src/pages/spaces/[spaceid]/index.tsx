import { firestore } from "@/src/firebase/clientApp";
import { Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { Space, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import safeJsonStringify from "safe-json-stringify";
import { GetServerSidePropsContext } from "next";
import NotFound from "@/src/components/Spaces.component.tsx/NotFound";
import { Header } from "@/src/components/Spaces.component.tsx/Header.spaces";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { CreatePostLink } from "@/src/components/Spaces.component.tsx/CreatePostLink";
import { useSpaceDataFetch } from "@/src/components/Hooks/useSpaceDataFetch";
import { About } from "@/src/components/Spaces.component.tsx/About";
import { Posts } from "@/src/components/PostComponent/Posts";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

type spacePageProps = {
  spaceData: Space;
};

const SpacePage: React.FC<spacePageProps> = ({ spaceData }) => {
  const [spaceState, setSpaceState] = useRecoilState(spaceStateAtom);

  if (!spaceData) {
    return <NotFound />;
  }
  useEffect(() => {
    setSpaceState((prev) => ({
      ...prev,
      currentSpace: spaceData,
    }));
  }, [spaceData]);
  return (
    <div>
      <Header spacesData={spaceData} />
      <PageContentLayout>
        <>
          <CreatePostLink />
          {spaceState && <Posts spaceData={spaceData} />}
        </>
        <>
          <About spaceData={spaceData} />
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
