export type ModalType = {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  handleEmbed: () => void;
};
