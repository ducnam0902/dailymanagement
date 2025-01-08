import React from "react";
import { Password, PasswordProps } from "primereact/password";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

interface IPasswordCustom extends PasswordProps {
  name: string;
  label: string;
}

const PasswordCustom = ({ name, label, ...props }: IPasswordCustom) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  return (
    <>
      <label htmlFor={name} className="text-left text-base mb-2">
        {label}
      </label>
      <div className="flex ">
        <span className="p-inputgroup-addon">
          <i className="pi pi-key"></i>
        </span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const { ref, ...restField } = field;
            return (
              <Password
                aria-label={name}
                aria-labelledby={name}
                id={name}
                className="w-full"
                inputClassName={clsx(
                  "hover:border-secondary focus:shadow-2xl w-full p-3 pr-8 border border-solid border-[#d1d5db] rounded-tr-[6px] rounded-br-[6px] focus:border-primary focus-border focus-visible:outline-none",
                  {
                    "border-[#e24c4c]": !!errors[name],
                  }
                )}
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
      </div>
      <small className="mt-1 text-red-500 text-left h-5">
        {errorMessage?.toString() ?? ""}
      </small>
    </>
  );
};

export default PasswordCustom;
