import { FC } from "react";
import { ButtonType } from "../../types/form";

export const Button: FC<ButtonType> = ({
  content,
  size,
  btnClass,
  handleClick,
  bordered,
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${btnClass} btn-${size} ${
        bordered ? "btn-border" : ""
      } transition-all duration-500 ${disabled ? "btn-disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
