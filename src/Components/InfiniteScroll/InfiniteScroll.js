import { Center, Grid, useBoolean } from "@chakra-ui/react";
import loadable from "@loadable/component";
import { memo, useCallback, useContext, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import CountriesContext from "../../Contexts/Countries";
import FetchCountries from "../../Utilities/FetchCountries/FetchCountries";

const Card = loadable(() => import("../../Components/Card/Card"));
const Loading = loadable(() => import("../Loading/Loading"));

const InfiniteScroll = () => {
  const { CountriesState, CountriesDispatch, LimitData } =
    useContext(CountriesContext);

  const { inView, ref: IsVisibleRef } = useInView();

  const [isLoading, { on: DataNotLoaded, off: DataLoaded }] = useBoolean();

  const IsDefault = useMemo(
    () => CountriesState.Mode === "Default",
    [CountriesState]
  );

  const Countries = useMemo(
    () =>
      IsDefault
        ? CountriesState[CountriesState.Mode]
        : CountriesState[CountriesState.Mode][CountriesState.QueryKey],

    [IsDefault, CountriesState]
  );

  const CustomParams = useMemo(() => {
    if (IsDefault) {
      return {};
    }

    if (CountriesState.Mode === "Searches") {
      return {
        name: CountriesState.QueryKey,
        SearchingMode: "true",
      };
    }

    if (CountriesState.Mode === "Regions") {
      return {
        region: CountriesState.QueryKey,
        SearchingMode: "true",
      };
    }
  }, [CountriesState, IsDefault]);

  const IsDataEnded = Countries.PageLength < Countries.Page;

  const LoadMore = useCallback(
    async (Page, CustomParam) => {
      DataNotLoaded();
      const NewCountries = await FetchCountries(LimitData, Page, CustomParam);
      CountriesDispatch({
        type: "MergeNewData",
        payload: {
          QueryKey: CountriesState.QueryKey,
          NewData: NewCountries,
          IsDefault,
          ModeKey: CountriesState.Mode,
        },
      });
      DataLoaded();
    },
    [
      IsDefault,
      DataLoaded,
      DataNotLoaded,
      LimitData,
      CountriesState,
      CountriesDispatch,
    ]
  );

  useEffect(() => {
    if (inView && !IsDataEnded && !isLoading) {
      LoadMore(Countries.Page, CustomParams);
    }
  }, [inView, LoadMore, isLoading, IsDataEnded, Countries.Page, CustomParams]);

  return (
    <>
      <Grid
        justifyContent="stretch"
        gap="5"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        px={{
          base: "5",
        }}
        mt="8"
        alignContent="stretch"
      >
        {Countries.Data.map((Country, Index) => (
          <Card
            ref={Index === Countries.Data.length - 1 ? IsVisibleRef : null}
            key={Country.id}
            ImageUrl={Country.flag}
            ImageAlt={`${Country.name} flag`}
            Title={Country.name}
            Details={[
              {
                Title: "Pouplation",
                Value: parseInt(Country.population, 10).toLocaleString(),
              },
              { Title: "Region", Value: Country.region },
              { Title: "Capital", Value: Country.capital },
            ]}
          />
        ))}
      </Grid>
      {!IsDataEnded ? (
        <Center py="4">
          <Loading />
        </Center>
      ) : null}
    </>
  );
};
export default memo(InfiniteScroll);
