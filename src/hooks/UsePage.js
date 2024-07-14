import { useCallback, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MainContext, content } from "../context/MainContext";
import axios from "axios";
import { getToken, host } from "../util/help";
import toast from "react-hot-toast";
import { PageContext } from "../context/PageContext";

const usePage = () => {
  //context
  const { startTheDisable, stopTheDisable, closeConfirmModal, closeModal } =
    useContext(MainContext);
  const {
    addPageInformation,
    followPage_,
    unfollowPage_,
    blockFollower_,
    unblockUser_,
    changeAbout,
    deleteRate_,
    addRate_,
    editRate_,
    add_Edit_Bio,
    editCategories_,
    editLogoCover,
  } = useContext(PageContext);
  //hooks
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  //variables
  const pageId = params.pageId;

  //functions
  const startLoadingAndDisable = useCallback(() => {
    setIsLoading(true);
    startTheDisable();
  }, [startTheDisable]);

  const stopLoadingAndDisable = useCallback(() => {
    setIsLoading(false);
    stopTheDisable();
  }, [stopTheDisable]);

  const getPageInformation = useCallback(async () => {
    startLoadingAndDisable();
    try {
      const response = await axios.get(`${host}/page/MainInfo/${pageId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
   
      addPageInformation(response.data.mainInfo[0]);
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
      stopLoadingAndDisable();
    }
  }, [
    startLoadingAndDisable,
    stopLoadingAndDisable,
    pageId,
    navigate,
    addPageInformation,
  ]);

  const followPage = async () => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/likeInPage`,
        { pageId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      console.log(response)
      followPage_();
      toast.success(response.data.message, { id: toastId });
    } catch (error) {
    console.log(error)
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
  const unfollowPage = async () => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/unlikeInPage`,
        { pageId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      unfollowPage_();
      toast.success(response.data.message, { id: toastId });
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
  const blockFollower = async (user) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/blockUser`,
        { pageId, userId: user.userId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      blockFollower_(user);
      toast.success(response.data.message, { id: toastId });
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
  const unblockUser = async (user) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/unblockUser`,
        { pageId, userId: user.userId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      unblockUser_(user);
      toast.success(response.data.message, { id: toastId });
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
  const inviteFriend = async (friendId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/InviteFriend`,
        { pageId, friendId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
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
  const updateAbout = async (desc, data, fn) => {
    data.pageId = pageId;
    startTheDisable();
    const toastId = toast.loading("wait...");
    let url = `${host}/page/`;
  
    switch (desc) {
      case "Gender":
        url = url + "updateGender";

        break;
      case "Date of birth":
        url = url + "updateBirthday";

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
      case "Email":
        url = url + "updateEmail";
        break;

      default:
        break;
    }

    try {
      const response = await axios.post(url, data, {
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
      stopTheDisable();
    }
  };

  // will pass another parameter which is function sometimes will use
  // now will use for after delete
  const deleteAbout = async (desc, data, fn) => {
    data.pageId = pageId;
    startTheDisable();
    const toastId = toast.loading("wait...");
    let url = `${host}/page/`;
    
    switch (desc) {
      case "Gender":
        url = url + "deleteGender";

        break;
      case "Date of birth":
        url = url + "deleteBirthday";

        break;
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
      case "Email":
        url = url + "deleteEmail";
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
      stopTheDisable();
    }
  };
  const addAbout = async (desc, data, fn) => {
    data.pageId = pageId;
    startTheDisable();
    const toastId = toast.loading("wait...");
    let url = `${host}/page/`;

    switch (desc) {
      case "Gender":
        url = url + "addGender";

        break;
      case "Date of birth":
        url = url + "addBirthday";
        break;
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
      case "Email":
        url = url + "addEmail";
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
      stopTheDisable();
    }
  };

  const deleteRate = async (_rateId, value) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/deleteRate`,
        { pageId, _rateId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      deleteRate_(_rateId, value);
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
  const addRate = async (comment, value) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/ratePage`,
        { pageId, comment, value },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      closeModal();

      addRate_(response.data.newRating);
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
  const editRate = async (comment, value, _rateId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/updateRate`,
        { pageId, comment, value, _rateId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      closeModal();

      editRate_(comment, value);
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
  const addBio = async (bio) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/addBio`,
        { pageId, bio },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      closeModal();

      add_Edit_Bio(bio);
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
  const editBio = async (bio) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/updateBio`,
        { pageId, bio },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      closeModal();

      add_Edit_Bio(bio);
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
  const editCategories = async (categories) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/page/updateCategories`,
        { pageId, categories },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success(response.data.message, { id: toastId });
      closeModal();

      editCategories_(categories);
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

  const add_Edit_Logo_Cover = async (assets, type) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    const formData = new FormData();

    formData.append("assets", assets[0].originalFile);
    formData.append("pageId", pageId);

    let url = `${host}/page/`;
    if (type === content.ADD_LOGO_PAGE || type === content.EDIT_LOGO_PAGE) {
      url = url + "updateLogo";
    }
    if (type === content.ADD_COVER_PAGE || type === content.EDIT_COVER_PAGE) {
      url = url + "updateCover";
    }

    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  
      toast.success(response.data.message, { id: toastId });
      editLogoCover(response.data.link, type);
      closeModal();
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
  const deletePage = async () => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.delete(`${host}/page/deletePage`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        data: { pageId },
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
  return {
    isLoading,
    getPageInformation,
    followPage,
    unfollowPage,
    blockFollower,
    unblockUser,
    inviteFriend,
    updateAbout,
    deleteAbout,
    addAbout,
    deleteRate,
    addRate,
    editRate,
    addBio,
    editBio,
    editCategories,
    add_Edit_Logo_Cover,
    deletePage,
  };
};

export default usePage;
