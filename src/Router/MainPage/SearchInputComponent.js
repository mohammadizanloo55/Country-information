import loadable from "@loadable/component";
import localforage from "localforage";
import { memo, useContext } from "react";
import { useDebouncedCallback } from "use-debounce";

import CountriesContext from "../../Contexts/Countries";
import FetchCountries from "../../Utilities/FetchCountries/FetchCountries";

const SearchInput = loadable(() =>
  import("../../Components/SearchInput/SearchInput")
);

const SearchInputComponent = () => {
  const { CountriesState, CountriesDispatch, LimitData } =
    useContext(CountriesContext);

  const SearchInputChanged = useDebouncedCallback(async (e) => {
    const InputValue = e.target.value;
    const Item = await localforage.getItem("Countries");

    const ExpireTime = await localforage.getItem("ExpireTime");

    if (
      Item &&
      Item.Searches[InputValue] &&
      Item.Searches[InputValue].Data &&
      Item.Searches[InputValue].Data.length > 0 &&
      ExpireTime &&
      ExpireTime > Date.now()
    ) {
      return CountriesDispatch({
        type: "SetNewData",
        payload: {
          ModeKey: "Searches",
          NewData: {
            ...Item.Searches[InputValue],
            data: Item.Searches[InputValue].Data,
          },
          Page: Item.Searches[InputValue].Page,
        },
      });
    }
    if (InputValue.length > 0) {
      if (CountriesState.Searches[InputValue]) {
        return CountriesDispatch({
          type: "SetNewData",
          payload: {
            NewData: {
              ...CountriesState.Searches[InputValue],
              data: CountriesState.Searches[InputValue].Data,
            },
            IsDefault: false,
            ModeKey: "Searches",
            QueryKey: InputValue,
          },
        });
      }

      const NewData = await FetchCountries(LimitData, 1, {
        name: InputValue,
        SearchingMode: true,
      });

      return CountriesDispatch({
        type: "SetNewData",
        payload: {
          NewData,
          IsDefault: false,
          ModeKey: "Searches",
          QueryKey: InputValue,
        },
      });
    }

    return CountriesDispatch({
      type: "SetNewData",
      payload: {
        FakeUpdate: true,
        NewData: {
          ...CountriesState.Default,
          data: CountriesState.Default.Data,
        },
        IsDefault: true,
        ModeKey: "Default",
      },
    });
  }, 900);

  return (
    <SearchInput
      Placeholder="Search for a country..."
      Type="text"
      onChange={SearchInputChanged}
    />
  );
};

export default memo(SearchInputComponent);
