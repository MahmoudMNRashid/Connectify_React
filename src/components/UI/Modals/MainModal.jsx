import { createPortal } from "react-dom";
import classes from "./MainModal.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { useContext } from "react";
import { MainContext, content } from "../../../context/MainContext";
import AddRateCard from "../../Page/AddRateCard";
import EditNameCard from "../../Profile/EditNameCard";
import Add_Edit_BioCard from "../../Profile/Add_Edit_BioCard";
import Add_Edit_BackgroundCard from "../../Profile/Add_Edit_BackgroundCard";
import EditPostCard from "../../Post/EditPostCard";
import AddReportCard from "../../Group/AddReportCard";
import BlockMemberCard from "../../Group/BlockMemberCard";
import CreatePostCard from "../../Post/CreatePostCard";
import CreatePageCard from "../../Profile/CreatePageCard";
import CreateGroupCard from "../../Profile/CreateGroupCard";
import Add_Edit_Bio_PageCard from "../../Page/Add_Edit_Bio_PageCard";
import EditCategoriesCard from "../../Page/EditCategoriesCard";
import Add_Edit_Logo_Cover_PageCard from "../../Page/Add_Edit_Logo_Cover_PageCard";
import HandleLogoCard from "../../Profile/HandleLogoCard";
import SearchInPostCard from "../../Post/SearchInPostCard";
import LikesCard from "../../Post/LikesCard";

const MainModal = () => {
  const { disableIsActive, closeModal, contentModal } = useContext(MainContext);

  const handleCloseTheModal = () => {
    closeModal();
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
          <button disabled={disableIsActive} onClick={handleCloseTheModal}>
            <MdOutlineCancel />
          </button>
        </div>
        <div id="allComments" className={classes.main__content}>
          {contentModal === content.EDIT_NAME && <EditNameCard />}
          {(contentModal === content.ADD_BIO ||
            contentModal === content.EDIT_BIO) && <Add_Edit_BioCard />}

          {(contentModal === content.EDIT_BACKGROUND ||
            contentModal === content.ADD_BACKGROUND) && (
            <Add_Edit_BackgroundCard />
          )}

          {(contentModal === content.ADD_RATE ||
            contentModal === content.EDIT_RATE) && (
            <>
              <AddRateCard />
            </>
          )}
          {contentModal === content.EDIT_POST && (
            <>
              <EditPostCard />
            </>
          )}
          {contentModal === content.ADD_REPORT && (
            <>
              <AddReportCard />
            </>
          )}
          {contentModal === content.BLOCK_MEMBER && (
            <>
              <BlockMemberCard />
            </>
          )}
          {contentModal === content.CREATE_POST && (
            <>
              <CreatePostCard />
            </>
          )}
          {contentModal === content.CREATE_PAGE && (
            <>
              <CreatePageCard />
            </>
          )}
          {contentModal === content.CREATE_GROUP && (
            <>
              <CreateGroupCard />
            </>
          )}
          {(contentModal === content.ADD_BIO_PAGE ||
            contentModal === content.EDIT_BIO_PAGE) && (
            <>
              <Add_Edit_Bio_PageCard />
            </>
          )}

          {contentModal === content.EDIT_CATEGORIES && (
            <>
              <EditCategoriesCard />
            </>
          )}
          {(contentModal === content.EDIT_LOGO_PAGE ||
            contentModal === content.EDIT_COVER_PAGE ||
            contentModal === content.ADD_LOGO_PAGE ||
            contentModal === content.ADD_COVER_PAGE) && (
            <>
              <Add_Edit_Logo_Cover_PageCard />
            </>
          )}
          {contentModal === content.HANDLE_LOGO && (
            <>
              <HandleLogoCard />
            </>
          )}
          {contentModal === content.SEARCH_IN_POSTS && (
            <>
              <SearchInPostCard />
            </>
          )}
          {contentModal === content.LIKES && (
            <>
              <LikesCard />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const MainModalInstance = () => {
  return createPortal(<MainModal />, document.getElementById("modal"));
};

export default MainModalInstance;
