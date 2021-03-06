import { Center, Spinner, Text } from "@chakra-ui/react";
import { memo } from "react";

const Loading = memo(() => {
  return (
    <Center h="80%" flexDirection="column">
      <Text fontSize="4xl" mb="10">
        Loading ...
      </Text>
      <Spinner size="xl" />
    </Center>
  );
});
export default Loading;
