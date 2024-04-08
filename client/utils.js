import Cookies from "js-cookie";
export const getCookie = () => {
  const cookies = Cookies.get("token");
  return cookies;
};

export const setCookie = async (data) => {
  try {
    const res = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
