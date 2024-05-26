import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { getToken, host } from "../util/help";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import toast from "react-hot-toast";
import { MainContext, content } from "../context/MainContext";

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
  } = useContext(ProfileContext);
  const { startTheDisable, stopTheDisable, closeModal, closeConfirmModal } =
    useContext(MainContext);
  const params = useParams();

  //Variable
  const userId = params.userId;

  //Function
  const getMainInformationApi = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${host}/profile/mainInfo/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      addMainInformation(response.data.mainInfo[0]);
      console.log(response);
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
    } finally {
      setIsLoading(false);
    }
  }, [addMainInformation, userId, navigate]);

  const editNameApi = async (newFirstName, newLastName) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      editName(newFirstName, newLastName);
      closeModal("n");
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };

  const updateOrAddBio = async (bio) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      editBio(bio);
      closeModal(content.ADD_BIO);
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };

  const cancelFriendRequestSentByMeApi = async (reciverId, from) => {
    setIsLoading(true);
    startTheDisable();
    try {
      const response = await axios.post(
        `${host}/profile/cancelFriendRequestSentByMe`,
        {
          reciverId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message);

      if (from === "OUTGOING REQUESTS") {
        console.log("dddd");
        RemoveRequestFromFriendsRequestSend(reciverId);
      }
      if (from === "MAIN INFORMATION") {
        editFriendType("areYouSendFriendRequestToHim-false");
      }

      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };
  const addFriendApi = async (reciverId) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      editFriendType("areYouSendFriendRequestToHim-true");
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };
  const unfriendApi = async (idFriend) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      editFriendType("isHeFriend-false");
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };
  const acceptfriendApi = async (senderId, from) => {
    setIsLoading(true);
    startTheDisable();
    try {
      const response = await axios.post(
        `${host}/profile/acceptFriendrequest`,
        {
          senderId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message);

      if (from === "INCOMING REQUESTS") {
        console.log("dddd");
        RemoveRequestFromFriendsRequestRecieve(senderId);
      }
      if (from === "MAIN INFORMATION") {
        editFriendType("isHeFriend-true");
      }
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };

  const cancelFriendRequestSentToMeApi = async (senderId, from) => {
    setIsLoading(true);
    startTheDisable();
    try {
      const response = await axios.post(
        `${host}/profile/cancelFriendRequestSentToMe`,
        {
          senderId,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message);

      if (from === "INCOMING REQUESTS") {
        console.log("dddd");
        RemoveRequestFromFriendsRequestRecieve(senderId);
      }
      if (from === "MAIN INFORMATION") {
        editFriendType("isHeSendFriendRequestToYou-false");
      }

      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };

  const updateBackgroundApi = async (assets) => {
    const formData = new FormData();
    console.log(assets);
    console.log([assets[0].originalFile ? assets[0].originalFile : assets[0]]);
    formData.append("assets", assets[0].originalFile);

    setIsLoading(true);
    startTheDisable();
    try {
      const response = await axios.patch(
        `${host}/profile/updateProfileBackgroundPhoto`,
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message);
      if (assets[0].originalFile) {
        editBackgroundImage(response.data.link);
      }
      closeModal(content.EDIT_BACKGROUND);
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };

  const deleteBackgroundApi = async (publicId) => {
    startTheDisable();
    try {
      const response = await axios.delete(
        `${host}/profile/deleteBackgroundPhoto`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { publicId },
        }
      );
      toast.success(response.data.message);
      closeConfirmModal();
      deleteBackgroundImage();
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      stopTheDisable();
    }
  };

  const updateAboutApi = async (desc, data, fn) => {
    startTheDisable();
    let url = `${host}/profile/`;
    console.log(data);
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
    console.log(url);
    try {
      const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success(response.data.message);

      // deleteBackgroundImage();
      changeAbout("UPDATE", desc, data);
      fn();
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      stopTheDisable();
    }
  };

  // will pass another parameter which is function sometimes will use
  // now will use for after delete
  const deleteAboutApi = async (desc, data, fn) => {
    startTheDisable();
    let url = `http://localhost:8080/profile/`;
    console.log(desc);
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
      toast.success(response.data.message);
      closeConfirmModal();
      // deleteBackgroundImage();
      console.log(response);

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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      stopTheDisable();
    }
  };
  const addAboutApi = async (desc, data, fn) => {
    startTheDisable();
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
      toast.success(response.data.message);
      if (desc === "School") {
        data = response.data.highSchool;
      }
      if (desc === "University") {
        data = response.data.college;
      }
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      stopTheDisable();
    }
  };

  const deleteGroupInvite = async (_id) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      DeleteGroupInvite(_id);
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };
  const deletePageInvite = async (_InvitationId) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      DeletePageInvite(_InvitationId);
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };
  const acceptPageInvite = async (_InvitationId, idPage) => {
    setIsLoading(true);
    startTheDisable();
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
      toast.success(response.data.message);
      AcceptPageInvite(idPage);
      console.log(response);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
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
  };
};
export default useProfile;
