import React from "react";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import clsx from "clsx";

interface ICustomDropdown extends DropdownProps {
    dropdownClassName?: string
}

const CustomDropdown = ({ dropdownClassName, ...props }: ICustomDropdown) => {
  return (
    <Dropdown
      optionLabel="label"
      optionValue="value"
      className={clsx("w-full hover:border-primary focus-within:shadow-2xl focus-within:border-primary", dropdownClassName)}
      pt={{
        item: ({ context }) => (clsx({
            "bg-primary text-white": context.selected,
          }))
        ,
      }}
      {...props}
    />
  );
};

export default CustomDropdown;
