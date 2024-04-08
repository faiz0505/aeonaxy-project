import axios from "axios";
import Cookies from "js-cookie";
export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
export const getCookie = () => {
  const cookies = Cookies.get("token");
  return cookies;
};
export const setCookie = async (data) => {
  try {
    const response = await api.post("/", data);

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
