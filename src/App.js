import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Header = loadable(() => import("./Components/Header/Header"));

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const App = () => {
  const theme = extendTheme({ config });
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            main page
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
