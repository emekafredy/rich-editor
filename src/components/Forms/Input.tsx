import { FC } from "react";
import { InputType } from "../../types/form";

export const Input: FC<InputType> = ({
  formLabel,
  inputType,
  value,
  setValue,
  formTitle,
  errors,
  setErrors,
}) => {
  const handleChange = (e: any) => {
    setErrors({});
    setValue(e.target.value);
  };
  return (
    <div className="mb-4">
      <label
        className="block text-gray-200 text-xs font-medium mb-2"
        htmlFor={formTitle}
      >
        {formLabel}
      </label>

      <input
        className="appearance-none bg-white-200 border border-white-300 rounded w-full placeholder-gray-100 py-2 px-3 text-gray-200 leading-tight"
        id={formTitle}
        type={inputType}
        placeholder=""
        defaultValue={value}
        onChange={(e: any) => handleChange(e)}
        required
      />
      {errors[formTitle] && (
        <label
          className="block font-medium text-red-100 text-xs leading-16 mb-2"
          htmlFor={formTitle}
        >
          {formLabel}
          {errors[formTitle]}
        </label>
      )}
    </div>
  );
};
