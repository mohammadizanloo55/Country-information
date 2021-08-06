import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Header = loadable(() => import("./Components/Header/Header"));
const MainPage = loadable(() => import("./Router/MainPage/MainPage"));

const ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body, #root": {
        height: "100% !important",
      },
      "input,textarea,button,select,a": {
        WebkitTapHighlightColor: "transparent",
      },
    },
  },
};

const App = () => {
  const theme = extendTheme(ThemeConfig);
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};

export default App;
