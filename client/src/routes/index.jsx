import React from "react";
import { getCookie, setCookie } from "../../utils";

const index = () => {
  return (
    <div>
      <button
        onClick={async () => {
          console.log(await setCookie({ name: "faiz" }));
        }}
      >
        set Cookies
      </button>
      <button
        onClick={() => {
          console.log(getCookie());
        }}
      >
        Get Cookies
      </button>
    </div>
  );
};

export default index;
