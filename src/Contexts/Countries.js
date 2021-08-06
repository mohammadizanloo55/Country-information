import { createContext } from "react";

const CountriesContext = createContext({
  Mode: "Default",
  QueryKey: "",
  Default: {
    Data: [],
    PageLength: Number(),
    Page: 2,
  },
  Regions: {},
  Searches: {},
});
export default CountriesContext;
