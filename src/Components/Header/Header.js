import {
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";

const Header = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(HiMoon, HiOutlineMoon);

  return (
    <Flex
      px={{
        base: 2,
        sm: 7,
        md: 10,
        lg: 15,
        xl: 100,
      }}
      w="100%"
      shadow="xl"
      alignItems="center"
      justifyContent="space-between"
      py="5"
    >
      <Text
        alignSelf="center"
        fontSize={{
          base: "medium",
          sm: "xl",
          md: "x-large",
        }}
        fontWeight="extrabold"
      >
        Where in the world?
      </Text>
      <Button
        bg="none"
        _hover="none"
        _focus="none"
        d="flex"
        fontSize={{
          base: "medium",
          sm: "xl",
          md: "x-large",
        }}
        fontWeight="normal"
        alignItems="center"
        onClick={toggleColorMode}
      >
        <Text mx={1}>
          <SwitchIcon />
        </Text>
        Dark mode
      </Button>
    </Flex>
  );
};
export default Header;
