import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import loadable from "@loadable/component";

const Header = loadable(() => import("./Components/Header/Header"));

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const App = () => {
  const theme = extendTheme({ config });
  return (
    <ChakraProvider theme={theme}>
      <Header />
    </ChakraProvider>
  );
};

export default App;
