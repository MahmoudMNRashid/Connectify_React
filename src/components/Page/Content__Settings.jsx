import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import usePage from "../../hooks/UsePage";
import { MainContext } from "../../context/MainContext";

const Content__Settings = () => {
  const { pageInformation } = useContext(PageContext);
  const { deletePage } = usePage();
  const { openConfirmModal, disableIsActive } = useContext(MainContext);
  const handleDeletePage = () => {
    openConfirmModal(deletePage);
  };
  const isHeOwner = pageInformation.isHeOwner;
  return (
    <div className="M_A_M__Content__Container">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        {isHeOwner && (
          <div className="continer__settings__profile">
            <button
              disabled={disableIsActive}
              className="delete__profile__button"
              onClick={handleDeletePage}
            >
              Delete the page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content__Settings;
