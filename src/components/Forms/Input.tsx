import { FC } from "react";
import { InputType } from "../../types/form";

export const Input: FC<InputType> = ({
  formLabel,
  inputType,
  value,
  setValue,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-200 text-xs font-regular mb-2"
        htmlFor={formLabel}
      >
        {formLabel}
      </label>

      <input
        className="appearance-none bg-white-200 border border-white-300 rounded w-full placeholder-gray-100 py-2 px-3 text-gray-200 leading-tight"
        id={formLabel}
        type={inputType}
        placeholder=""
        defaultValue={value}
        onChange={(e: any) => setValue(e.target.value)}
        required
      />
    </div>
  );
};
