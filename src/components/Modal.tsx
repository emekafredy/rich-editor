import { FC } from "react";
import { ModalType } from "../types/modal";

export const Modal: FC<ModalType> = ({ children, setShowModal }) => {
  const onModalClick = (e: any) => {
    e.stopPropagation();
  };

  const onOverlayClick = (e: any) => {
    setShowModal(false);
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="modal"
        onClick={onOverlayClick}
        role="button"
        tabIndex={-1}
      >
        <div>
          <div
            className="modal-content"
            onClick={onModalClick}
            role="button"
            tabIndex={-2}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="modal-overlay" />
    </>
  );
};
