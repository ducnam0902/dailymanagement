import React from "react";
import { Password, PasswordProps } from "primereact/password";
import { Controller, useFormContext } from "react-hook-form";

interface IPasswordCustom extends PasswordProps {
  name: string;
}

const PasswordCustom = ({ name, ...props }: IPasswordCustom) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { ref, ...restField } = field;
        return (
          <Password
            id={name}
            className="w-full"
            inputClassName="hover:border-secondary focus:shadow-2xl w-full p-3 pr-8 border border-solid border-[#d1d5db] rounded-tr-[6px] rounded-br-[6px] focus-visible:outline-none"
            invalid={!!errors[name]}
            feedback={false}
            unstyled={true}
            toggleMask
            inputRef={ref}
            {...restField}
            {...props}
          />
        );
      }}
    />
  );
};

export default PasswordCustom;
