import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { getToken, host, localHost } from "../util/help";
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
  } = useContext(ProfileContext);
  const { startTheDisable, stopTheDisable, closeModal, closeConfirmModal } =
    useContext(MainContext);
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [addMainInformation, userId, navigate]);

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
  
        RemoveRequestFromFriendsRequestSend(reciverId);
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
      
        RemoveRequestFromFriendsRequestRecieve(senderId);
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
      
        RemoveRequestFromFriendsRequestRecieve(senderId);
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
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
      toast.success(response.data.message);

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
  const createPage = async (name, categories) => {
    setIsLoading(true);
    startTheDisable();
    try {
      const response = await axios.post(
        `${localHost}/page/createPage`,
        {
          name,
          categories,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message);
    
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
    }
  };
  const createGroup = async (name, privacy, visibility) => {

    setIsLoading(true);
    startTheDisable();
    try {
      const response = await axios.post(
        `${localHost}/group/createGroup`,
        {
          name,
          privacy,
          visibility,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      toast.success(response.data.message);
   
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
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      stopTheDisable();
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

      navigate("/");
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
  };
};
export default useProfile;
