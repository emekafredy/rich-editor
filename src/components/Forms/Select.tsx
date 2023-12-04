import { FC, useState } from "react";
import { FormSelectType } from "../../types/form";
import ChevronDownIcon from "../../assets/icons/icon-chevron-down.svg";
import ChevronUpIcon from "../../assets/icons/icon-chevron-up.svg";

export const Select: FC<FormSelectType> = ({
  formLabel,
  optionsData,
  selected,
  setSelected,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelectChange = (provider: string) => {
    setSelected(provider);
    setOpen(false);
  };

  return (
    <div className="w-full mt-8 mb-4">
      <label
        className="block text-gray-200 text-xs mb-2 font-regular uppercase"
        htmlFor={formLabel}
      >
        {formLabel}
      </label>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 flex items-center text-black-100 justify-between
          rounded cursor-pointer bg-white-200 border border-white-300"
      >
        {selected || "Select a provider"}
        <img
          src={open ? ChevronUpIcon : ChevronDownIcon}
          alt="logo"
          className="px-2"
        />
      </div>
      <ul
        className={`bg-white dark:bg-black-300 mt-2 rounded overflow-y-auto transition-all duration-500 shadow-md ${
          open ? "max-h-28 z-[50]" : "max-h-0"
        } `}
      >
        {optionsData?.map((data, i) => {
          return (
            <li
              key={i}
              className={`p-2 text-m cursor-pointer text-black-100 ${
                selected === data
                  ? "bg-green-100 hover:bg-green-100"
                  : "hover:bg-white-200"
              }`}
              onClick={() => handleSelectChange(data)}
            >
              {data}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
