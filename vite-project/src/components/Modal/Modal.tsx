import React, { FunctionComponent, useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import { useAppContext } from "../../context/AppContext";
import { closeModal } from "../../context/actions";

const Modal: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { isModalOpen, modalContent, modalProps, showModalButton },
    dispatch,
  } = useAppContext();

  const onClickClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
   if (!isModalOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    } else {
      setIsOpen(true);
    }
  }, [isModalOpen]);

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div
            className={`modal__container ${
              isModalOpen
                ? "modal__container--fade-in"
                : "modal__container--fade-out"
            }`}
          >
            {modalContent ? modalContent({ ...modalProps }) : null}
            {showModalButton && (
              <button className="modal__close-btn" onClick={onClickClose}>
                <CloseIcon />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
