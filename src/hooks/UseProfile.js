import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { getToken, host } from "../util/help";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import toast from "react-hot-toast";
import { MainContext } from "../context/MainContext";

const useProfile = () => {
  //Hooks
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    addMainInformation,
    editName,
    editBio,
    editFriendType,
    editBackgroundImage,
    deleteBackgroundImage,
    changeAbout,
    DeleteGroupInvite,
    DeletePageInvite,
    AcceptPageInvite,
    RemoveRequestFromFriendsRequestSend,
    RemoveRequestFromFriendsRequestRecieve,
    addNewPhoto,
    deleteCurrentPhotoOrPrevious,
    setPreviousPhotoAsCurrentProfilePhoto_,
    unblockUser__,
  } = useContext(ProfileContext);
  const {
    startTheDisable,
    stopTheDisable,
    closeModal,
    closeConfirmModal,
    openErrorModal,
  } = useContext(MainContext);
  const params = useParams();

  //Variable
  const userId = params.userId;

  //Function
  const startLoadingAndDisable = useCallback(() => {
    setIsLoading(true);
    startTheDisable();
  }, [startTheDisable]);

  const stopLoadingAndDisable = useCallback(() => {
    setIsLoading(false);
    stopTheDisable();
  }, [stopTheDisable]);

  const getMainInformationApi = useCallback(async () => {
    startLoadingAndDisable();
    try {
      const response = await axios.get(`${host}/profile/mainInfo/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      addMainInformation(response.data.mainInfo[0]);
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong");
      openErrorModal();
    } finally {
      stopLoadingAndDisable();
    }
  }, [
    addMainInformation,
    userId,
    navigate,
    startLoadingAndDisable,
    stopLoadingAndDisable,
    openErrorModal,
  ]);

  const editNameApi = async (newFirstName, newLastName) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.put(
        `${host}/profile/updatePofileFirstAndLastName`,
        {
          newFirstName,
          newLastName,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      editName(newFirstName, newLastName);

      toast.success(response.data.message, { id: toastId });
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const updateOrAddBio = async (bio) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.patch(
        `${host}/profile/updateProfileBio`,
        {
          bio,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      editBio(bio);
      toast.success(response.data.message, { id: toastId });
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const cancelFriendRequestSentByMeApi = async (reciver, from) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/cancelFriendRequestSentByMe`,
        {
          reciverId: reciver.userId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });

      if (from === "OUTGOING REQUESTS") {
        RemoveRequestFromFriendsRequestSend(reciver.userId);
      }
      if (from === "MAIN INFORMATION") {
        editFriendType("areYouSendFriendRequestToHim-false");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const addFriendApi = async (reciverId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/sendFriendRequest`,
        {
          reciverId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      editFriendType("areYouSendFriendRequestToHim-true");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const unfriendApi = async (idFriend) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/unfriend`,
        {
          idFriend,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      editFriendType("isHeFriend-false");
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const acceptfriendApi = async (sender, from) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/acceptFriendrequest`,
        {
          senderId: sender.userId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });

      if (from === "INCOMING REQUESTS") {
        RemoveRequestFromFriendsRequestRecieve(sender, true);
      }
      if (from === "MAIN INFORMATION") {
        editFriendType("isHeFriend-true");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const cancelFriendRequestSentToMeApi = async (sender, from) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/cancelFriendRequestSentToMe`,
        {
          senderId: sender.userId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });

      if (from === "INCOMING REQUESTS") {
        RemoveRequestFromFriendsRequestRecieve(sender);
      }
      if (from === "MAIN INFORMATION") {
        editFriendType("isHeSendFriendRequestToYou-false");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const updateBackgroundApi = async (assets) => {
    const formData = new FormData();

    formData.append("assets", assets[0].originalFile);

    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.patch(
        `${host}/profile/updateProfileBackgroundPhoto`,
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      if (assets[0].originalFile) {
        editBackgroundImage(response.data.link);
      }
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const deleteBackgroundApi = async (publicId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.delete(
        `${host}/profile/deleteBackgroundPhoto`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { publicId },
        }
      );
      toast.success(response.data.message, { id: toastId });
      closeConfirmModal();
      deleteBackgroundImage();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const updateAboutApi = async (desc, data, fn) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    let url = `${host}/profile/`;

    switch (desc) {
      case "Gender":
        url = url + "updateProfileGender";

        break;
      case "Date of birth":
        url = url + "updateProfileBirthday";

        break;
      case "University":
        url = url + "updateEducationCollege";

        break;
      case "Phone":
        url = url + "updatePhoneNumber";

        break;
      case "City":
        url = url + "updateCurrentCity";

        break;
      case "Home town":
        url = url + "updateHometown";

        break;
      case "School":
        url = url + "updateEducationHighSchool";

        break;

      default:
        break;
    }

    try {
      const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success(response.data.message, { id: toastId });

      // deleteBackgroundImage();
      changeAbout("UPDATE", desc, data);
      fn();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  // will pass another parameter which is function sometimes will use
  // now will use for after delete
  const deleteAboutApi = async (desc, data, fn) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    let url = `${host}/profile/`;

    switch (desc) {
      case "University":
        url = url + "deleteEducationCollege";

        break;
      case "Phone":
        url = url + "deletePhoneNumber";

        break;
      case "City":
        url = url + "deleteCurrentCity";

        break;
      case "School":
        url = url + "deleteEducationHighSchool";

        break;
      case "Home town":
        url = url + "deleteHometown";
        break;

      default:
        break;
    }
    try {
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
        data: data ? data : undefined,
      });
      toast.success(response.data.message, { id: toastId });
      closeConfirmModal();
      // deleteBackgroundImage();

      changeAbout("DELETE", desc);
      fn();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const addAboutApi = async (desc, data, fn) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    let url = `${host}/profile/`;

    switch (desc) {
      case "University":
        url = url + "addEducationCollege";

        break;
      case "Phone":
        url = url + "addPhoneNumber";

        break;
      case "City":
        url = url + "addCurrentCity";

        break;
      case "School":
        url = url + "addEducationHighSchool";

        break;
      case "Home town":
        url = url + "addHometown";
        break;

      default:
        break;
    }
    try {
      const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success(response.data.message, { id: toastId });
      if (desc === "School") {
        data = response.data.highSchool;
      }
      if (desc === "University") {
        data = response.data.college;
      }

      changeAbout("ADD", desc, data);
      fn();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const deleteGroupInvite = async (_id) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/cancelInvite`,
        {
          _id,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      DeleteGroupInvite(_id);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const deletePageInvite = async (_InvitationId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/page/cancelInvite`,
        {
          _InvitationId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      DeletePageInvite(_InvitationId);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const acceptPageInvite = async (_InvitationId, page) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/page/acceptInvite`,
        {
          _InvitationId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      AcceptPageInvite(page);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const createPage = async (name, categories) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/page/createPage`,
        {
          name,
          categories,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });

      closeModal();
      navigate(`/page/${response.data.result._id}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const createGroup = async (name, privacy, visibility) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/group/createGroup`,
        {
          name,
          privacy,
          visibility,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });

      closeModal();
      navigate(`/group/${response.data.groupId}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const deleteAccount = async () => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.delete(`${host}/profile/deleteAccount`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success(response.data.message, { id: toastId });

      navigate("/logout", { replace: true });
      closeConfirmModal();
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const addNewProfilePhotoAndSet = async (assets) => {
    const formData = new FormData();
    formData.append("assets", assets[0].originalFile);
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/addProfilePhotoAndSet`,
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      addNewPhoto(response.data.photo);
      closeModal();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const deleteCurrentPhotoOrPreviousPhoto = async (publicId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.delete(
        `${host}/profile/deleteCurrentProfilePhotoOrPreviousPhoto`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { publicId },
        }
      );

      toast.success(response.data.message, { id: toastId });
      deleteCurrentPhotoOrPrevious(publicId);
      // closeModal();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const setPreviousPhotoAsCurrentProfilePhoto = async (publicID) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/setPreviousPhotoAsCurrentProfilePhoto`,
        { publicID },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      setPreviousPhotoAsCurrentProfilePhoto_(publicID);
      // closeModal();
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const blockUser = async (_id) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/blockProfile`,
        {
          _id,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      navigate(".", { replace: true });
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  const unblockUser = async (_id) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/profile/unblockProfile`,
        {
          _id,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message, { id: toastId });
      unblockUser__(_id);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
          replace: true,
        });
      }
      toast.error(error.response?.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };
  return {
    isLoading,
    getMainInformation: getMainInformationApi,
    editNameApi: editNameApi,
    updateOrAddBio,
    cancelFriendRequestSentByMeApi,
    addFriendApi,
    unfriendApi,
    acceptfriendApi,
    cancelFriendRequestSentToMeApi,
    updateBackgroundApi,
    deleteBackgroundApi,
    updateAboutApi,
    addAboutApi,
    deleteAboutApi,
    deleteGroupInvite,
    deletePageInvite,
    acceptPageInvite,
    createPage,
    createGroup,
    deleteAccount,
    addNewProfilePhotoAndSet,
    deleteCurrentPhotoOrPreviousPhoto,
    setPreviousPhotoAsCurrentProfilePhoto,
    blockUser,
    unblockUser,
  };
};
export default useProfile;
