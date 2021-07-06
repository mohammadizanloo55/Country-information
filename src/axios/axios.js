import axios from "axios";

const BaseUrlChecker = (BaseUrl) => {
  if (!BaseUrl) {
    throw Error(
      "You have not specified the value of the REACT_APP_API in the .env file"
    );
  }
  return BaseUrl;
};
const UrlMixer = (Url, Path) => {
  return new URL(Path, Url).href;
};
const config = axios.create({
  baseURL: UrlMixer(BaseUrlChecker(process.env.REACT_APP_API), "/api/v1"),
  timeout: 10000,
});
export default config;
