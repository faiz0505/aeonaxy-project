import React from "react";
import { Radio } from "@nextui-org/react";
export const CustomRadio = ({ children, ...props }) => {
  return <Radio {...props}>{children}</Radio>;
};
