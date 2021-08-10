import { Grid } from "@chakra-ui/react";
import loadable from "@loadable/component";
import localforage from "localforage";
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

  useEffect(
    () =>
      localforage.config({
        name: "Countries",
        driver: localforage.INDEXEDDB,
        storeName: "Countries",
        description: "this Db has all prev states",
      }),
    []
  );

  useEffect(() => {
    const SetDataInDB = async () => {
      const { Mode, QueryKey } = CountriesState;

      const IsDefault = Mode === "Default";

      const { Data, Page: StatePage } = IsDefault
        ? CountriesState[Mode]
        : CountriesState[Mode][QueryKey];

      const Item = await localforage.getItem("Countries");

      if (Data.length) {
        const DB = IsDefault ? Item?.[Mode] : Item?.[Mode]?.[QueryKey];

        if (!DB || StatePage > DB?.Page) {
          await localforage
            .setItem("Countries", CountriesState)
            .catch((err) => console.error(err));
        }
      }
    };

    SetDataInDB();
  }, [CountriesState]);

  useEffect(() => {
    const LoadData = async () => {
      const Item = await localforage.getItem("Countries");

      const ExpireTime = await localforage.getItem("ExpireTime");

      if (
        Item &&
        Item.Default.Data.length > 0 &&
        ExpireTime &&
        ExpireTime > Date.now()
      ) {
        return CountriesDispatch({
          type: "SetNewData",
          payload: {
            ModeKey: "Default",
            NewData: {
              ...Item.Default,
              data: Item.Default.Data,
            },
            Page: Item.Default.Page,
            IsDefault: true,
          },
        });
      }

      await localforage.setItem("ExpireTime", Date.now() + 604_800_000);

      const Countries = await FetchCountries(LimitData);

      CountriesDispatch({
        type: "SetNewData",
        payload: {
          ModeKey: "Default",
          NewData: Countries,
          IsDefault: true,
        },
      });

      return Countries;
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
