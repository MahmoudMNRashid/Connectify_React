import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const content = Object.freeze({
  ADD_BIO: "add bio",
  EDIT_BIO: "edit bio",
  EDIT_NAME: "edit name",
  EDIT_BACKGROUND: "edit background",
  ADD_BACKGROUND: "add background",
});

export const MainContext = createContext({
  disableIsActive: false,
  startTheDisable: () => {},
  stopTheDisable: () => {},
  /////////////////////////
  modalEditNameIsOpen: false,
  contentModal: "",
  openModal: () => {},
  closeModal: () => {},
  ///////////////////////
  confirmModalIsOpen: false,
  activeFn: () => {},
  openConfirmModal: () => {},
  closeConfirmModal: () => {},
});

export default function MainContextProvider({ children }) {
  const [disableIsActive, setDisableIsActive] = useState(false);
  const handleStartTheDisable = () => {
    setDisableIsActive(true);
  };
  const handleStopTheDisable = () => {
    setDisableIsActive(false);
  };
  //////////////////////////////////////
  const [contentModal, setContentModal] = useState("");
  const [modalEditNameIsOpen, setModalEditNameIsOpen] = useState(false);

  const handleOpenModal = (key, contentM) => {
    if ((key === "name", contentM === content.EDIT_NAME)) {
      setModalEditNameIsOpen(true);
      setContentModal(content.EDIT_NAME);
    }

    if (key === "bio" && contentM === content.ADD_BIO) {
      setModalEditNameIsOpen(true);
      setContentModal(content.ADD_BIO);
    }
    if (key === "bio" && contentM === content.EDIT_BIO) {
      setModalEditNameIsOpen(true);
      setContentModal(content.EDIT_BIO);
    }
    if (key === "background" && contentM === content.EDIT_BACKGROUND) {
      setModalEditNameIsOpen(true);
      setContentModal(content.EDIT_BACKGROUND);
    }
    if (key === "background" && contentM === content.ADD_BACKGROUND) {
      setModalEditNameIsOpen(true);
      setContentModal(content.ADD_BACKGROUND);
    }
  };

  const handleCloseModal = (key) => {
    if (
      key === content.ADD_BIO ||
      key === content.EDIT_BIO ||
      key === content.EDIT_NAME ||
      key === content.EDIT_BACKGROUND
    ) {
      setModalEditNameIsOpen(false);
    }

    // if (key === "c") {
    //   setCommentsModalIsOpen(false);
    // }
  };
  ////////////////////////////////////
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [activeFn, setActiveFn] = useState(null);

  const handleOpenconfirmModal = (fn) => {
    setConfirmModalIsOpen(true);
    setActiveFn(() => fn);
  };
  const handleCLoseconfirmModal = () => {
    setConfirmModalIsOpen(false);
    setActiveFn(null);
  };

  const ctxValue = {
    disableIsActive,
    startTheDisable: handleStartTheDisable,
    stopTheDisable: handleStopTheDisable,
    /////////////////////////
    modalEditNameIsOpen,
    contentModal,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    /////////////////////////
    confirmModalIsOpen,
    openConfirmModal: handleOpenconfirmModal,
    closeConfirmModal: handleCLoseconfirmModal,
    activeFn,
  };
  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
