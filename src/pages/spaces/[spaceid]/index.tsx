import { firestore } from "@/src/firebase/clientApp";
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
import Posts from "@/src/components/PostComponent/Posts";
import { Suspense } from "react";

import { UpdateSpace } from "../../../components/Spaces.component.tsx/SpaceUpdate";
import { Loading } from "@/src/components/animations/Loading";
type spacePageProps = {
  spaceData: Space;
};

const SpacePage: React.FC<spacePageProps> = ({ spaceData }) => {
  if (!spaceData) {
    return <NotFound />;
  }

  return (
    <>
      <Header spacesData={spaceData} />

      <PageContentLayout>
        <>
          <Suspense
            fallback={
              <Loading
                link={
                  "https://assets3.lottiefiles.com/private_files/lf30_fnvabe85.json"
                }
              />
            }
          >
            <Tabs position="relative" variant="unstyled">
              <TabList
                ml={"1"}
                width={"100%"}
                display={"flex"}
                justifyContent={"space-evenly"}
              >
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
                  {spaceData && <Posts spaceData={spaceData} />}
                </TabPanel>
                <TabPanel>
                  <UpdateSpace spaceData={spaceData} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Suspense>
        </>

        <>
          <About spaceData={spaceData} />
        </>
      </PageContentLayout>
    </>
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
