import { useState } from "react";
import { Loading } from "../../animations/Loading";
import {
  Flex,
  Stack,
  Text,
  Icon,
  Box,
  Checkbox,
  Input,
  Image,
} from "@chakra-ui/react";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
} from "react-icons/bs";
import { BiHide } from "react-icons/bi";
import { MdOutlinePublic } from "react-icons/md";
import { RiChatPrivateFill } from "react-icons/ri";

type CreateSpaceFlowProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  spaceType: string;
  handleCheckSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

export const CreateSpaceFlow: React.FC<CreateSpaceFlowProps> = ({
  handleCheckSelection,
  error,
  spaceType,
  handleInputChange,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("pickSpaceVibe");
  return (
    <>
      <Flex>
        {activeTab === "pickSpaceVibe" && (
          <PickSpaceVibeTab setActiveTab={setActiveTab} />
        )}
        {activeTab === "createSpace" && (
          <CreateSpaceTab
            setActiveTab={setActiveTab}
            handleCheckSelection={handleCheckSelection}
            handleInputChange={handleInputChange}
            spaceType={spaceType}
            error={error}
            loading={loading}
          />
        )}
      </Flex>
    </>
  );
};
type PickSpaceVibeTabProps = {
  setActiveTab: (value: string) => void;
};
export const PickSpaceVibeTab: React.FC<PickSpaceVibeTabProps> = ({
  setActiveTab,
}) => {
  return (
    <>
      <Flex fontSize={"sm"} flexDir={"column"}>
        <Text>comming soon...</Text>
        <Text>
          you would be able to pick a space vibe, this can be educational,
          entertainment, football ... this would help users to discover your
          space based on interest
        </Text>
        <Text>
          for now click proceed to go ahead and create a general space
        </Text>
        <Flex
          cursor={"pointer"}
          align={"center"}
          justify={"flex-end"}
          onClick={() => {
            setActiveTab("createSpace");
          }}
          flexDir={"column"}
        >
          <Stack>
            <Loading
              link={
                "https://assets9.lottiefiles.com/packages/lf20_osdxlbqq.json"
              }
              size={150}
            />
          </Stack>
          <Flex align={"center"}>
            <Text m={"2"}> proceed</Text>
            <Icon as={BsFillArrowRightSquareFill} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

type CreateSpaceTabProp = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string;
  spaceType: string;
  handleCheckSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveTab: (value: string) => void;
};

export const CreateSpaceTab: React.FC<CreateSpaceTabProp> = ({
  handleInputChange,
  handleCheckSelection,
  error,
  spaceType,
  setActiveTab,
  loading,
}) => {
  return (
    <>
      {!loading ? (
        <>
          <Flex flexDir={"column"} height={"fit-content"}>
            <Text>Enter the name of the spaceType you want to create</Text>
            <Input
              mt={"5"}
              borderRadius={"full"}
              maxLength={30}
              size={"lg"}
              color={"brand.700"}
              onChange={handleInputChange}
            />
            {error.length > 2 && (
              <Text color={"red.500"} fontSize={"xs"}>
                {error}
              </Text>
            )}

            <Box display={"flex"} flexDir={"column"} pt={"10"}>
              <Checkbox
                name="public"
                isChecked={spaceType === "public"}
                onChange={handleCheckSelection}
                size={{ base: "sm", md: "md" }}
                css={`
                  > span:first-of-type {
                    box-shadow: unset;
                  }
                `}
              >
                <Flex align={"center"}>
                  <Icon as={MdOutlinePublic} />
                  <Text ml={"2"}>Public</Text>
                  <Text fontSize={"x-small"} ml={"5"}>
                    everyone can view and post
                  </Text>
                </Flex>
              </Checkbox>

              <Checkbox
                name="private"
                isChecked={spaceType === "private"}
                onChange={handleCheckSelection}
                size={{ base: "sm", md: "md" }}
                css={`
                  > span:first-of-type {
                    box-shadow: unset;
                  }
                `}
              >
                <Flex align={"center"}>
                  <Icon as={RiChatPrivateFill} />
                  <Text ml={"2"}>Private</Text>
                  <Text fontSize={"x-small"} ml={"5"}>
                    everyone can view and comment but cannot post
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                name="restricted"
                isChecked={spaceType === "restricted"}
                onChange={handleCheckSelection}
                size={{ base: "sm", md: "md" }}
                css={`
                  > span:first-of-type {
                    box-shadow: unset;
                  }
                `}
              >
                <Flex align={"center"}>
                  <Icon as={BiHide} />
                  <Text ml={"2"}>Restricted</Text>
                  <Text fontSize={"x-small"} ml={"5"}>
                    only approved users can view it and post
                  </Text>
                </Flex>
              </Checkbox>
              <Flex
                my={"2"}
                align={"center"}
                justify={"flex-start"}
                onClick={() => {
                  setActiveTab("pickSpaceVibe");
                }}
                cursor={"pointer"}
              >
                <Icon as={BsFillArrowLeftSquareFill} />
                <Text m={"2"}> back to pick vibe</Text>
              </Flex>
            </Box>
          </Flex>
        </>
      ) : (
        <Stack align={"center"} justify={"center"}>
          <Loading
            link={
              "https://assets6.lottiefiles.com/packages/lf20_Au6z826BEy.json"
            }
            size={250}
          />
        </Stack>
      )}
    </>
  );
};
