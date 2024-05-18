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
  const { addMainInformation, editName, editBio, editFriendType } =
    useContext(ProfileContext);
  const { startTheDisable, stopTheDisable, closeModal } =
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

  const cancelFriendRequestSentByMeApi = async (reciverId) => {
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
      editFriendType("areYouSendFriendRequestToHim-false");
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
  const acceptfriendApi = async (senderId) => {
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
      editFriendType("isHeFriend-true");
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

  const cancelFriendRequestSentToMeApi = async (senderId) => {
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
      editFriendType("isHeSendFriendRequestToYou-false");
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
    cancelFriendRequestSentToMeApi
  };
};

export default useProfile;
