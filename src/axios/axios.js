import axios from "axios";

const BaseUrlChecker = (BaseUrl) => {
  if (!BaseUrl) {
    throw Error(
      "You have not specified the value of the REACT_APP_API in the .env file"
    );
  }
  return BaseUrl;
};
const config = axios.create({
  baseURL: BaseUrlChecker(process.env.REACT_APP_API),
  timeout: 10000,
});
export default config;
