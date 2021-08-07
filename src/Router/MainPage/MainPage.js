import { Grid } from "@chakra-ui/react";
import loadable from "@loadable/component";
import { memo, useEffect, useMemo, useReducer } from "react";

import CountriesContext from "../../Contexts/Countries";
import CountriesReducer from "../../Reducers/Countries";
import FetchCountries from "../../Utilities/FetchCountries/FetchCountries";

const Loading = loadable(() => import("../../Components/Loading/Loading"));
const SearchInputComponent = loadable(() => import("./SearchInputComponent"));
const FilterDropDownComponent = loadable(() =>
  import("./FilterDropDownComponent")
);
const InfiniteScroll = loadable(() =>
  import("../../Components/InfiniteScroll/InfiniteScroll")
);

const MainPage = () => {
  const LimitData = useMemo(() => 12, []);

  const [CountriesState, CountriesDispatch] = useReducer(CountriesReducer, {
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

  const IsCountriesLoaded = useMemo(
    () => CountriesState.Default.Data.length > 0,
    [CountriesState]
  );

  useEffect(() => {
    const LoadData = async () => {
      const Countries = await FetchCountries(LimitData);
      CountriesDispatch({
        type: "SetNewData",
        payload: {
          ModeKey: "Default",
          NewData: Countries,
          IsDefault: true,
        },
      });
    };
    LoadData();
  }, [LimitData]);

  const ContextValue = useMemo(
    () => ({
      CountriesState,
      CountriesDispatch,
      LimitData,
    }),
    [CountriesState, CountriesDispatch, LimitData]
  );

  if (!IsCountriesLoaded) {
    return <Loading />;
  }

  return (
    <CountriesContext.Provider value={ContextValue}>
      <Grid
        justifyContent="space-between"
        templateColumns={{
          base: "repeat(1,auto)",
          sm: "repeat(2,auto)",
        }}
        gap="5"
        m="3"
        mt="7"
      >
        <SearchInputComponent />

        <Grid templateColumns="repeat(12,auto)">
          <FilterDropDownComponent />
        </Grid>
      </Grid>
      <InfiniteScroll />
    </CountriesContext.Provider>
  );
};

export default memo(MainPage);
