import { useContext, useState } from "react";
import styles from "./PageMainInfoCard.module.css";
import { BsCardHeading } from "react-icons/bs";
import { FaEdit, FaRegIdBadge } from "react-icons/fa";
import { PageContext } from "../../context/PageContext";
import page__logo_default from "../../assets/post/page_default.svg";
import defaultCover from "../../assets/page/default_cover.jpg";
import usePage from "../../hooks/UsePage";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { LuShieldClose } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import { MainContext, content } from "../../context/MainContext";
import { MdAdd, MdOutlineModeEdit } from "react-icons/md";
import { PostContext } from "../../context/PostContext";

const PageMainInfoCard = () => {
  const { openModal } = useContext(MainContext);
  const { addAssets, openModal: openAssetsModal } = useContext(PostContext);
  const { pageInformation } = useContext(PageContext);
  const { followPage } = usePage();
  const { unfollowPage } = usePage();
  const name = pageInformation.name;

  const logo = pageInformation.logo
    ? pageInformation.logo.link
    : page__logo_default;

  //   const isHeOwner = pageInformation.isHeOwner;
  const isHeFollowers = pageInformation.isHeFollowers;
  const isHeOwner = pageInformation.isHeOwner;
  const bio = pageInformation.bio;
  const categories = pageInformation.categories;
  const finalCategories = categories?.join(",");
  const showButtonFollow = !isHeFollowers;
  const showButtonFollowing = isHeFollowers;
  const cover = pageInformation.cover
    ? pageInformation.cover.link
    : defaultCover;

  const [showMenu, setShowMenu] = useState(false);

  const openEditBioModal = () => {
    openModal("page", content.EDIT_BIO_PAGE);
  };
  const openAddBioModal = () => {
    openModal("page", content.ADD_BIO_PAGE);
  };
  const openEdit_CategoriesModal = () => {
    openModal("page", content.EDIT_CATEGORIES);
  };
  const openEditLogoModal = () => {
    openModal("page", content.EDIT_LOGO_PAGE);
  };
  const openAddLogoModal = () => {
    openModal("page", content.ADD_LOGO_PAGE);
  };
  const openEditCoverModal = () => {
    openModal("page", content.EDIT_COVER_PAGE);
  };
  const openAddCoverModal = () => {
    openModal("page", content.ADD_COVER_PAGE);
  };
  const handleAddCoverToContextAndOpenTheModal = () => {
    addAssets([pageInformation.cover]);
    openAssetsModal("a");
    document.body.classList.add("hide__scroll");
  };
  const handleAddLogoToContextAndOpenTheModal = () => {
    addAssets([pageInformation.logo]);
    openAssetsModal("a");
    document.body.classList.add("hide__scroll");
  };
  return (
    <>
    <div className={styles.container}>
      <div className={styles.cover__logo__section}>
        {pageInformation.cover && isHeOwner && (
          <button
            className={styles.cover__edit__button}
            onClick={openEditCoverModal}
          >
            <MdOutlineModeEdit />
          </button>
        )}
        {!pageInformation.cover && isHeOwner && (
          <button
            className={styles.cover__edit__button}
            onClick={openAddCoverModal}
          >
            <MdAdd />
          </button>
        )}
        <img
          className={styles.cover}
          src={cover}
          onClick={handleAddCoverToContextAndOpenTheModal}
        />

        <div className={styles.logo}>
          <img src={logo} onClick={handleAddLogoToContextAndOpenTheModal} />
          {pageInformation.logo && isHeOwner && (
            <button
              className={styles.logo__edit__button}
              onClick={openEditLogoModal}
            >
              <MdOutlineModeEdit />
            </button>
          )}
          {!pageInformation.logo && (
            <button
              className={styles.logo__edit__button}
              onClick={openAddLogoModal}
            >
              <MdAdd />
            </button>
          )}
        </div>
      </div>
      <div className={styles.data__section}>
        <div className={styles.data__button__container}>
          <div className={styles.data__container}>
            <div>
              <FaRegIdBadge fontSize={"2rem"} color="#76aaad" />
              <p>{name}</p>
            </div>
            <div>
              <BsCardHeading fontSize={"2rem"} color="#76aaad" />
              {bio && <p>{bio}</p>}
              {bio && isHeOwner && <FaEdit onClick={openEditBioModal} />}
              {!bio && isHeOwner && (
                <span>
                  <IoMdAdd
                    data-tooltip-id="tttt"
                    data-tooltip-content={"Add bio"}
                    data-tooltip-place="right"
                    onClick={openAddBioModal}
                  />{" "}
                  <Tooltip id="tttt" effect="solid" variant="light" />
                </span>
              )}
            </div>
            <div>
              <BiCategory fontSize={"2rem"} color="#76aaad" />
              <p>{finalCategories}</p>
              {isHeOwner && (
                <FaEdit
                  className={styles.categories__edit}
                  data-tooltip-id="ttttt"
                  data-tooltip-content={"Edit Categories"}
                  data-tooltip-place="right"
                  onClick={openEdit_CategoriesModal}
                />
              )}
              <Tooltip id="ttttt" effect="solid" variant="light" />
            </div>
          </div>
          {showButtonFollow && (
            <button onClick={followPage} className={styles.button}>
              Follow
            </button>
          )}
          {showButtonFollowing && (
            <button
              onClick={() => {
                setShowMenu(true);
              }}
              className={styles.button}
            >
              Following
            </button>
          )}
        </div>
        {showMenu && (
          <div className={styles.menu}>
            <div
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <IoMdClose fontSize={"1.7rem"} />
              <p>Close</p>
            </div>
            <div
              onClick={async () => {
                await unfollowPage();
                setShowMenu(false);
              }}
            >
              <LuShieldClose fontSize={"1.7rem"} />
              <p>Unfollow</p>
            </div>
          </div>
        )}
      </div>
    </div>

</>  );
};

export default PageMainInfoCard;
