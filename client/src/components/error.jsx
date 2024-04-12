import React from "react";

const Error = ({ error }) => {
  return (
    <div className="w-full min-h-8 bg-red-700 ">
      <p>{JSON.stringify(error)}</p>
    </div>
  );
};

export default Error;
