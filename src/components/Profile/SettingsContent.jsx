import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import useProfile from "../../hooks/UseProfile";
import { MainContext, content } from "../../context/MainContext";

const SettingsContent = () => {
  const { mainInformation } = useContext(ProfileContext);
  const isHeOwner = mainInformation.isHeOwner;
  const { deleteAccount } = useProfile();
  const { openConfirmModal, openModal, disableIsActive } =
    useContext(MainContext);
  const handleDeletePage = () => {
    openConfirmModal(deleteAccount);
  };

  const openCreatePageModal = () => {
    openModal("page", content.CREATE_PAGE);
  };
  const openCreateGroupModal = () => {
    openModal("group", content.CREATE_GROUP);
  };
  return (
    <div className="container__profile">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          // margin: "1rem",
          width: "100%",
        }}
      >
        {isHeOwner && (
          <div className="continer__settings__profile">
            <button
              className="delete__profile__button"
              onClick={handleDeletePage}
              disabled={disableIsActive}
            >
              Delete My account
            </button>
          </div>
        )}
        {isHeOwner && (
          <div className="continer__settings__profile  ">
            <button
              className="create__page__button"
              onClick={openCreatePageModal}
              disabled={disableIsActive}
            >
              Create Page
            </button>
          </div>
        )}
        {isHeOwner && (
          <div className="continer__settings__profile">
            <button
              className="create__group__button"
              onClick={openCreateGroupModal}
              disabled={disableIsActive}
            >
              Create Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsContent;
