import axios from "../../axios/axios";

const FetchCountries = async (Limit, Page = 1, CustomParams = {}) => {
  const Countries = await axios.get("/", {
    params: {
      Fields: "name;population;alpha3Code;region;capital",
      Limit,
      Page,
      ...CustomParams,
    },
  });

  return Countries.data;
};
export default FetchCountries;
