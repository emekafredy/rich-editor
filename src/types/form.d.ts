export type FormSelectType = {
  formLabel: string;
  optionsData: string[] | any[] | undefined;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export type InputType = {
  formLabel?: string;
  inputType?: string;
  value?: string | number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export type ButtonType = {
  content: string | React.ReactNode;
  size: string;
  btnClass: string;
  handleClick: () => void;
  bordered?: boolean;
  disabled?: boolean;
};
