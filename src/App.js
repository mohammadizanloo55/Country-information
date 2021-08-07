import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import loadable from "@loadable/component";
import { memo, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Header = loadable(() => import("./Components/Header/Header"));
const MainPage = loadable(() => import("./Router/MainPage/MainPage"));

const App = () => {
  const ThemeConfig = useMemo(
    () => ({
      initialColorMode: "system",
      useSystemColorMode: false,
      styles: {
        global: {
          "html, body, #root": {
            height: "100% !important",
            overflowX: "hidden",
          },
          "input,textarea,button,select,a": {
            WebkitTapHighlightColor: "transparent",
          },
        },
      },
    }),
    []
  );
  const theme = extendTheme(ThemeConfig);
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Container
        px="0"
        height="100%"
        maxW={{
          lg: "1000px",
          xl: "1800px",
        }}
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default memo(App);
