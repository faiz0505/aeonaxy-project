import axios from "axios";
import toast from "react-hot-toast";
export const apiUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: { apiUrl },
  withCredentials: true,
});

export const getToken = async () => {
  try {
    const res = await api.get(`${apiUrl}/fetch-token`);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
export const checkVerification = async () => {
  try {
    const res = await api.get(`${apiUrl}/verify-token`);
    console.log(res);
  } catch (error) {
    toast.error(error.message);
  }
};
