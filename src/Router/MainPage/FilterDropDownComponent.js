import loadable from "@loadable/component";
import { memo, useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

import CountriesContext from "../../Contexts/Countries";
import FetchCountries from "../../Utilities/FetchCountries/FetchCountries";

const FilterDropDown = loadable(() =>
  import("../../Components/FilterDropDown/FilterDropDown")
);

const FilterDropDownComponent = () => {
  const { CountriesState, CountriesDispatch, LimitData } =
    useContext(CountriesContext);

  const FilterDropDownChanged = useDebouncedCallback(async (Region) => {
    if (Region === "All") {
      return CountriesDispatch({
        type: "SetNewData",
        payload: {
          NewData: {
            ...CountriesState.Default,
            data: CountriesState.Default.Data,
          },
          IsDefault: true,
          ModeKey: "Default",
        },
      });
    }

    if (CountriesState.Regions[Region]) {
      return CountriesDispatch({
        type: "SetNewData",
        payload: {
          NewData: {
            ...CountriesState.Regions[Region],
            data: CountriesState.Regions[Region].Data,
          },
          IsDefault: false,
          ModeKey: "Regions",
          QueryKey: Region,
        },
      });
    }
    const NewData = await FetchCountries(LimitData, 1, {
      region: Region,
    });
    return CountriesDispatch({
      type: "SetNewData",
      payload: {
        NewData,
        IsDefault: false,
        ModeKey: "Regions",
        QueryKey: Region,
      },
    });
  }, 900);

  return (
    <FilterDropDown
      OnChange={FilterDropDownChanged}
      mx="2"
      Options={["All", "Africa", "Americas", "Asia", "Europe", "Oceania"]}
      Title="Filter by Region"
    />
  );
};
export default memo(FilterDropDownComponent);
