import axios from "../../axios/axios";

const FetchCountry = async (CountryName, Fields) => {
  const Country = await axios
    .get(`/${CountryName}`, {
      params: {
        Fields,
      },
    })
    .catch((err) => console.error(err));
  return Country.data;
};
export default FetchCountry;
