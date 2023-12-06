import { FC } from "react";
import { ModalType } from "../types/modal";
import { Button } from "./Forms";

export const Modal: FC<ModalType> = ({
  children,
  setShowModal,
  disabled,
  handleEmbed,
}) => {
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

            <div>
              <Button
                content="Embed"
                size="small"
                btnClass="primary"
                handleClick={() => handleEmbed()}
                disabled={disabled}
              />

              <Button
                content="Cancel"
                size="small"
                btnClass="secondary"
                handleClick={() => setShowModal(false)}
                bordered
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-overlay" />
    </>
  );
};
