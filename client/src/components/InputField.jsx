import React from "react";
import { Input } from "@nextui-org/react";
const InputField = ({ labelStyle, ...props }) => {
  return (
    <Input
      {...props}
      //   {...register(name, {
      //     options,
      //   })}
      classNames={{ label: labelStyle }}
    />
  );
};

export default InputField;
