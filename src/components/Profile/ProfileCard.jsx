import { useContext, useEffect, useState } from "react";
import style from "./ProfileCard.module.css";
import ProfileTabs from "./ProfileTabs";

import { ProfileContext } from "../../context/ProfileContext";
import defaultBackgroundImage from "../../assets/profile/back-school-seamless-pattern-vec.png";
import defaultLogo from "../../assets/post/profile_default.svg";
import SkeletonLoaders from "../UI/SkeletonLoaders";
import useProfile from "../../hooks/UseProfile";
import { FaUserEdit } from "react-icons/fa";
import { MainContext, content } from "../../context/MainContext";
import EditNameModalInstance from "../UI/Modals/MainModal";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BsPersonCheckFill } from "react-icons/bs";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonDashFill } from "react-icons/bs";
import { TfiClose } from "react-icons/tfi";
import { FcAddImage } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { FcRemoveImage } from "react-icons/fc";

import { TbEditCircle } from "react-icons/tb";
import { PostContext } from "../../context/PostContext";
const ProfileCard = () => {
  const { mainInformation } = useContext(ProfileContext);
  const { openModal, modalEditNameIsOpen, openConfirmModal, disableIsActive } =
    useContext(MainContext);
  const { isLoading, getMainInformation, deleteBackgroundApi } = useProfile();

  useEffect(() => {
    getMainInformation();
  }, [getMainInformation]);

  const firstName = mainInformation.firstName;
  const lastName = mainInformation.lastName;
  const isHeOwner = mainInformation.isHeOwner;
  const isHeFriend = mainInformation.isHeFriend;
  const isHeSendFriendRequestToYou = mainInformation.isHeSendFriendRequestToYou;
  const areYouSendFriendRequestToHim =
    mainInformation.areYouSendFriendRequestToHim;
  const canChangeName =
    mainInformation.canHeChangeName &&
    isHeOwner &&
    mainInformation.canHeChangeName
      ? mainInformation.canHeChangeName === true
      : false;

  const bio = mainInformation.bio ? mainInformation.bio : "";
  const backgroundImage = Array.isArray(
    mainInformation.backgroundPhotos ? mainInformation.backgroundPhotos : []
  )
    ? defaultBackgroundImage
    : mainInformation.backgroundPhotos?.link;

  const logo =
    mainInformation.profilePhotos?.length > 0
      ? mainInformation.profilePhotos[mainInformation.profilePhotos?.length - 1]
          .asset.link
      : defaultLogo;

  const handleOpenModalEditName = () => {
    openModal("name", content.EDIT_NAME);
  };
  const handleOpenModalAddBio = () => {
    openModal("bio", content.ADD_BIO);
  };
  const handleOpenModalEditBio = () => {
    openModal("bio", content.EDIT_BIO);
  };
  const handleOpenModalEditBackground = () => {
    openModal("background", content.EDIT_BACKGROUND);
  };
  const handleOpenModalADDBackground = () => {
    openModal("background", content.ADD_BACKGROUND);
  };

  const handleDeleteBackground = () => {
    openConfirmModal(() => {
      deleteBackgroundApi(mainInformation.backgroundPhotos.public_id);
    });
  };
  const { addAssets, openModal: openAssetsModal } = useContext(PostContext);

  const handleAddAssetsToContextAndOpenTheModal = () => {
    if (mainInformation.backgroundPhotos) {
      addAssets([mainInformation.backgroundPhotos]);
      openAssetsModal("a");
      document.body.classList.add("hide__scroll");
    }
  };

  const showEditBioButton = isHeOwner && bio !== "";
  const showAddBioButton = isHeOwner && bio === "";
  const showAddBackground = Array.isArray(
    mainInformation.backgroundPhotos ? mainInformation.backgroundPhotos : []
  )
    ? true
    : false;

  const openModalForHandleTheLogo = () => {
    openModal("profile", content.HANDLE_LOGO);
  };

  const handleAddLogoToContextAndOpenTheModal = () => {
    if (mainInformation.profilePhotos?.length > 0) {
      addAssets([
        mainInformation.profilePhotos[mainInformation.profilePhotos?.length - 1]
          .asset,
      ]);
      openAssetsModal("a");
      document.body.classList.add("hide__scroll");
    }
  };
  return (
    <>
      {modalEditNameIsOpen && <EditNameModalInstance />}

      {isLoading && <SkeletonLoaders />}

      {!isLoading && (
        <div className={style["profile-header"]}>
          <div className={style["profile-header-cover"]}>
            <img
              src={backgroundImage}
              onClick={handleAddAssetsToContextAndOpenTheModal}
            />

            {isHeOwner && (
              <div className={style.buttons__container}>
                {showAddBackground && (
                  <button
                    disabled={disableIsActive}
                    onClick={handleOpenModalADDBackground}
                  >
                    <FcAddImage />
                  </button>
                )}

                {!showAddBackground && (
                  <button
                    disabled={disableIsActive}
                    onClick={handleOpenModalEditBackground}
                  >
                    <FcEditImage />
                  </button>
                )}
                {!showAddBackground && (
                  <button
                    disabled={disableIsActive}
                    onClick={handleDeleteBackground}
                  >
                    <FcRemoveImage />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={style["profile-header-content"]}>
            <div className={style["profile-header-img"]}>
              <img
                src={logo}
                alt=""
                onClick={handleAddLogoToContextAndOpenTheModal}
              />
              {isHeOwner && (
                <button
                  disabled={disableIsActive}
                  className={style.edit__logo}
                  onClick={openModalForHandleTheLogo}
                >
                  <TbEditCircle />
                </button>
              )}
              <ButtonType
                isHeOwner={isHeOwner}
                isHeFriend={isHeFriend}
                isHeSendFriendRequestToYou={isHeSendFriendRequestToYou}
                areYouSendFriendRequestToHim={areYouSendFriendRequestToHim}
              />
            </div>

            <div className={style["profile-header-info"]}>
              <h4>
                {`${firstName} ${lastName}`}
                {canChangeName && (
                  <FaUserEdit
                    onClick={handleOpenModalEditName}
                    width={2}
                    cursor="pointer"
                    color="#008080"
                  />
                )}
              </h4>
              {bio !== "" && (
                <p>
                  {showEditBioButton && (
                    <FaRegEdit
                      onClick={handleOpenModalEditBio}
                      cursor="pointer"
                      color="#008080"
                    />
                  )}
                  {bio}
                </p>
              )}

              {showAddBioButton && (
                <button
                  disabled={disableIsActive}
                  onClick={handleOpenModalAddBio}
                >
                  <IoMdAdd />
                </button>
              )}
            </div>
          </div>

          <ProfileTabs />
        </div>
      )}
    </>
  );
};

export default ProfileCard;

const ButtonType = ({
  isHeOwner,
  isHeFriend,
  isHeSendFriendRequestToYou,
  areYouSendFriendRequestToHim,
}) => {
  const { mainInformation } = useContext(ProfileContext);
  const { disableIsActive } = useContext(MainContext);
  const {
    cancelFriendRequestSentByMeApi,
    addFriendApi,
    unfriendApi,
    acceptfriendApi,
    cancelFriendRequestSentToMeApi,
    blockUser,
  } = useProfile();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  return (
    <>
      {!isHeOwner && isHeFriend && (
        <button
          disabled={disableIsActive}
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <BsPersonCheckFill /> Friends
          {showMenu && (
            <div className={style.menu}>
              <main>
                <button
                  disabled={disableIsActive}
                  onClick={() => {
                    unfriendApi(mainInformation._id);
                  }}
                >
                  <BsFillPersonDashFill /> Unfriend
                </button>
                <button
                  disabled={disableIsActive}
                  onClick={() => {
                    blockUser(mainInformation._id);
                  }}
                >
                  <BsFillPersonDashFill /> block
                </button>
              </main>
            </div>
          )}
        </button>
      )}
      {!isHeOwner && !isHeFriend && isHeSendFriendRequestToYou && (
        <button
          disabled={disableIsActive}
          onClick={() => {
            setShowMenu2((prev) => !prev);
          }}
        >
          <BsPersonCheckFill />
          Responde
          {showMenu2 && (
            <div className={style.menu}>
              <main>
                <button
                  disabled={disableIsActive}
                  onClick={() => {
                    acceptfriendApi(mainInformation._id, "MAIN INFORMATION");
                  }}
                >
                  <BsFillPersonPlusFill /> Confirm
                </button>
                <button
                  disabled={disableIsActive}
                  onClick={() => {
                    cancelFriendRequestSentToMeApi(
                      mainInformation._id,
                      "MAIN INFORMATION"
                    );
                  }}
                >
                  <TfiClose /> Cancel
                </button>
              </main>
            </div>
          )}
        </button>
      )}
      {!isHeOwner && !isHeFriend && areYouSendFriendRequestToHim && (
        <button
          disabled={disableIsActive}
          onClick={() => {
            cancelFriendRequestSentByMeApi(
              mainInformation._id,
              "MAIN INFORMATION"
            );
          }}
        >
          <MdPersonRemoveAlt1 />
          Cancel
        </button>
      )}
      {!isHeOwner &&
        !isHeFriend &&
        !areYouSendFriendRequestToHim &&
        !isHeSendFriendRequestToYou && (
          <button
            disabled={disableIsActive}
            onClick={() => {
              addFriendApi(mainInformation._id);
            }}
          >
            <BsFillPersonPlusFill />
            Add Friend
          </button>
        )}
    </>
  );
};
