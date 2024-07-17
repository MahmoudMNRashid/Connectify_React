import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import useGroup from "../../hooks/UseGroup";
import ConfirmModalInstance from "../UI/Modals/ConfirmModal.jsx";

const Content__LeaveGroup = () => {
  const { leaveGroup } = useGroup();
  const { openConfirmModal, confirmModalIsOpen ,disableIsActive} = useContext(MainContext);
  const handleLeaveGroup = () => {
    openConfirmModal(leaveGroup);
  };
  return (
    <div className="M_A_M__Content__Container">
      {confirmModalIsOpen && <ConfirmModalInstance />}
      <button
        disabled={disableIsActive}
        onClick={handleLeaveGroup}
        className="leave"
      >
        Leave The Group
      </button>
    </div>
  );
};

export default Content__LeaveGroup;
