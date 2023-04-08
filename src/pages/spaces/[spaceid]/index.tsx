import { firestore } from "@/src/firebase/clientApp";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { Space, spaceStateAtom } from "@/src/Atoms/spacesAtom";
import safeJsonStringify from "safe-json-stringify";
import { GetServerSidePropsContext } from "next";
import NotFound from "@/src/components/Spaces.component.tsx/NotFound";
import { Header } from "@/src/components/Spaces.component.tsx/Header.spaces";
import { PageContentLayout } from "@/src/components/layouts/PageContentLayout";
import { CreatePostLink } from "@/src/components/Spaces.component.tsx/CreatePostLink";
import { About } from "@/src/components/Spaces.component.tsx/About";
import { Posts } from "@/src/components/PostComponent/Posts";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UpdateSpace } from "../../../components/Spaces.component.tsx/SpaceUpdate";

type spacePageProps = {
  spaceData: Space;
};

const SpacePage: React.FC<spacePageProps> = ({ spaceData }) => {
  const [spaceState, setSpaceState] = useRecoilState(spaceStateAtom);
  useEffect(() => {
    setSpaceState((prev) => ({
      ...prev,
      currentSpace: spaceData,
    }));
  }, [spaceData]);
  if (!spaceData) {
    return <NotFound />;
  }

  return (
    <div>
      <Header spacesData={spaceData} />
      <PageContentLayout>
        <>
          <Tabs position="relative" variant="unstyled">
            <TabList alignSelf={"center"}>
              <Tab>Post</Tab>
              <Tab>About</Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel mx={"0"} px={"0"}>
                <CreatePostLink />
                {spaceState && <Posts spaceData={spaceData} />}
              </TabPanel>
              <TabPanel>
                <UpdateSpace spaceData={spaceData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
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
