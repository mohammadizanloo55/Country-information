import {
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import loadable from "@loadable/component";
import { memo, useEffect, useMemo, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";

import FetchCountry from "../../Utilities/FetchCountry/FetchCountry";

const Loading = loadable(() => import("../../Components/Loading/Loading"));

const DetailPage = () => {
  const { CountryName } = useParams();

  const [CountryState, SetCountryState] = useState();

  const NormalData = useMemo(
    () =>
      CountryState
        ? [
            { Data: CountryState.nativeName, Title: "Native Name" },
            { Data: CountryState.population, Title: "Population" },
            { Data: CountryState.region, Title: "Region" },
            { Data: CountryState.subregion, Title: "Sub Region" },
            { Data: CountryState.capital, Title: "Capital" },
            {
              Title: "Top Level Domain",
              Data: CountryState.topLevelDomain.join(" , "),
            },
            {
              Title: "Currencies",
              Data: CountryState.currencies.map(({ name }) => name).join(" , "),
            },
            {
              Title: "Languages",
              Data: CountryState.languages.map(({ name }) => name).join(" , "),
            },
          ]
        : undefined,
    [CountryState]
  );

  useEffect(() => {
    const FetchData = async () => {
      const Country = await FetchCountry(
        CountryName,
        "nativeName;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;alpha3Code"
      );
      SetCountryState({
        ...Country.data,
        name: CountryName,
        population: parseInt(Country.data.population, 10).toLocaleString(),
      });
    };

    FetchData();
  }, [SetCountryState, CountryName]);

  if (!NormalData) {
    return (
      <Center minHeight="100vh">
        <Loading />
      </Center>
    );
  }

  return (
    <Grid
      mt="10"
      px="5"
      templateColumns="repeat(1,auto)"
      justifyContent="center"
    >
      <Link to="/">
        <Button variant="solid" maxWidth="32">
          <Text fontSize="2xl" mr="2">
            <HiArrowNarrowLeft />
          </Text>
          Back
        </Button>
      </Link>
      <Grid
        templateColumns={{
          base: "repeat(1,auto)",
          lg: "repeat(2,auto)",
        }}
        gap="32"
      >
        <Image mt="20" src={`${CountryState.flag}`} />
        <Grid>
          <Heading as="h1" mt="8" mb="4" fontSize="2xl">
            {CountryName}
          </Heading>

          {NormalData.map(({ Data, Title }) => (
            <Flex
              sx={{ margin: "10px 0em" }}
              key={Data}
              my="1"
              alignItems="baseline"
            >
              <Text as="strong" fontSize="xl">
                {Title}:
              </Text>

              <Text as="p" ml="2" fontSize="lg">
                {Data}
              </Text>
            </Flex>
          ))}

          <Flex my="1" flexDirection="column">
            <Text mt="3" as="strong" fontSize="xl">
              Border Countries :
            </Text>
            <Grid templateColumns="repeat(3,1fr)">
              {CountryState.borders.map((Name) => (
                <Button variant="outline" key={Name} m="2">
                  {Name}
                </Button>
              ))}
            </Grid>
          </Flex>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(DetailPage);
