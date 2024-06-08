import { useContext } from "react";
import useGroup from "../../hooks/UseGroup";
import classes from "./SettingCardDeleteGroup.module.css";
import { MainContext } from "../../context/MainContext";
import ConfirmModalInstance from "../UI/Modals/ConfirmModal";
const SettingCardDeleteGroup = () => {
  const { deleteGroup } = useGroup();
  const { openConfirmModal, confirmModalIsOpen } = useContext(MainContext);
  const handleDeleteGroup = () => {
    openConfirmModal(deleteGroup);
  };
  return (
    <div className={classes.dataHolder1}>
      {" "}
      {confirmModalIsOpen && <ConfirmModalInstance />}
      <button onClick={handleDeleteGroup}>Delete Group</button>
    </div>
  );
};

export default SettingCardDeleteGroup;
