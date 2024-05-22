import { createPortal } from "react-dom";
import classes from "./ConfirmModal.module.css";
import { GiCancel } from "react-icons/gi";
import { useContext } from "react";
import useProfile from "../../../hooks/UseProfile";
import { MainContext } from "../../../context/MainContext";
import Loader2 from "../Loader2";
import { GiConfirmed } from "react-icons/gi";
import { ProfileContext } from "../../../context/ProfileContext";
const ConfirmModal = () => {
  const { disableIsActive, closeConfirmModal, activeFn } =
    useContext(MainContext);

  const { mainInformation } = useContext(ProfileContext);
  const { isLoading } = useProfile();

  const handleCloseTheModal = () => {
    closeConfirmModal();
  };

  const handleConfirm = () => {

const arg = Array.isArray(mainInformation.backgroundPhotos)?undefined:mainInformation.backgroundPhotos.public_id

    activeFn(arg);
  };

  return (
    <>
      <button
        disabled={disableIsActive}
        onClick={handleCloseTheModal}
        className={classes.backdrop}
      ></button>

      <div className={classes.wrapper}>
        <div className={classes.header}>
        <p>Are You Sure</p>
          
        </div>
    

        <footer className={classes.footer}>
          <button onClick={handleConfirm} disabled={isLoading}>
            {!isLoading && <GiConfirmed />}
            {isLoading && <Loader2 />}
          </button>
          <button disabled={disableIsActive} onClick={handleCloseTheModal}>
          <GiCancel />
          </button>
        </footer>
      </div>
    </>
  );
};

const ConfirmModalInstance = () => {
  return createPortal(<ConfirmModal />, document.getElementById("modal"));
};

export default ConfirmModalInstance;
