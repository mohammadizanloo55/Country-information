import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const App = () => {
  const theme = extendTheme({ config });
  return <ChakraProvider theme={theme} />;
};

export default App;
