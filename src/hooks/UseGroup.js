import { useCallback, useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { getToken, host } from "../util/help";
import toast from "react-hot-toast";
import { GroupContext } from "../context/GroupContext";
import { PostContext } from "../context/PostContext";

const useGroup = () => {
  //context
  const { startTheDisable, stopTheDisable } = useContext(MainContext);
  const {
    addGroupInformation,
    handleRequestJoin,
    removeReport,
    removeAdminReport,
    removePost,
    removeMemberOrAdmin,
    removeAllPostsForMember,
    upgradeMember,
    downgradeAdmin,
    unblockMember,
    acceptPost,
    rejectPost,
    rejectJoinRequest,
    acceptJoinRequest,
    changeSetting,
    addDescription_,
    addCover_,
  } = useContext(GroupContext);

  const { deleteAllPostsForMember } = useContext(PostContext);
  //hooks

  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  //variables
  const groupId = params.groupId;

  //functions
  const startLoadingAndDisable = useCallback(() => {
    setIsLoading(true);
    startTheDisable();
  }, [startTheDisable]);

  const stopLoadingAndDisable = useCallback(() => {
    setIsLoading(false);
    stopTheDisable();
  }, [stopTheDisable]);

  const getgroupInformation = useCallback(async () => {
    startLoadingAndDisable();
    try {
      const response = await axios.get(
        `${host}/group/mainInformations/${groupId}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);
      addGroupInformation(response.data.mainInfo[0]);
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
    groupId,
    navigate,
    addGroupInformation,
  ]);

  const sendJoinRequest = async (groupId) => {
    startLoadingAndDisable();
    try {
      const response = await axios.post(
        `${host}/profile/sendRequestJoin/`,
        { groupId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);
      handleRequestJoin(response.data.message);
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
  };
  const cancelJoinRequest = async (groupId) => {
    startLoadingAndDisable();
    try {
      const response = await axios.post(
        `${host}/profile/cancelRequestJoin/`,
        { groupId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);
      handleRequestJoin(response.data.message);
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
  };

  const deleteReport = async (reportId) => {
    startLoadingAndDisable();
    try {
      const response = await axios.delete(
        `${host}/group/deletereportPost`,

        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { _id: reportId, groupId },
        }
      );

      removeReport(reportId);
      toast.success(response.data.message);
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
  };
  const deleteAdminReport = async (reportId) => {
    startLoadingAndDisable();
    const toastId = toast.loading("wait....");
    console.log(reportId);
    try {
      const response = await axios.delete(
        `${host}/group/deleteReportPostFromAdmin`,

        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { _id: reportId, groupId },
        }
      );

      removeAdminReport(reportId);
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

  const blockMemberOrAdmin = async (
    memberId,
    keepPosts,
    memberRole,
    groupID,
  ) => {
    startLoadingAndDisable();
    try {
      console.log(groupId || groupID);
      const response = await axios.post(
        `${host}/group/blockMemberOrAdmin`,
        { memberId, keepPosts, groupId: groupId || groupID },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);

      removeMemberOrAdmin(memberId, memberRole);

      if (keepPosts === 0) {
        deleteAllPostsForMember(memberId);
        removeAllPostsForMember(memberId);
      }
      toast.success(response.data.message);
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
      stopLoadingAndDisable();
    }
  };
  const unblockAMember = async (memberId) => {
    startLoadingAndDisable();
    try {
      console.log(memberId);
      const response = await axios.post(
        `${host}/group/unblockMember`,
        { memberId, groupId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);

      unblockMember(memberId);
      toast.success(response.data.message);
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
      stopLoadingAndDisable();
    }
  };

  const upgradeMemberToAdmin = async (memberId) => {
    startLoadingAndDisable();
    try {
      console.log(memberId);
      const response = await axios.post(
        `${host}/group/addAdmin`,
        { memberId, groupId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);

      toast.success(response.data.message);
      upgradeMember(memberId);
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
      stopLoadingAndDisable();
    }
  };
  const downgradeAdminToMember = async (adminId) => {
    startLoadingAndDisable();
    try {
      const response = await axios.post(
        `${host}/group/fromAdminToMember`,
        { adminId, groupId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);

      toast.success(response.data.message);
      downgradeAdmin(adminId);
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
      stopLoadingAndDisable();
    }
  };

  const deletePost = async (postId) => {
    startLoadingAndDisable();
    try {
      const response = await axios.delete(
        `${host}/group/deletePost`,

        {
          headers: { Authorization: `Bearer ${getToken()}` },
          data: { postId, groupId },
        }
      );
      console.log(response);
      removePost(postId);
      toast.success(response.data.message);
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
  };
  const acceptPinnedPost = async (_id) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/group/acceptRequestPost`,
        { _id, groupId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      acceptPost(_id);

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
  const rejectPinnedPost = async (_id) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/group/rejectRequestPost`,
        { _id, groupId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      rejectPost(_id);

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
  const acceptJoiningRequest = async (userId, userData) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/group/AcceptRequestJoin`,
        { userId, groupId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      acceptJoinRequest(userData);

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
  const rejectJoiningRequest = async (userId, userData) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/group/rejectRequestJoin`,
        { userId, groupId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      rejectJoinRequest(userData);

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

  const changeSettings = async (value, type) => {
    var url;
    var data;
    switch (type) {
      case "PRIVACY":
        console.log("first");
        url = `${host}/group/changePrivacy`;
        data = { groupId, privacy: value };
        break;
      case "VISIBILITY":
        url = `${host}/group/changeVisibility`;
        data = { groupId, visibility: value };
        break;
      case "IMMDIATE_POST":
        url = `${host}/group/changeImmediatePost`;
        data = { groupId, immediatePost: value };
        break;
      case "WHO_CAN_APPROVE_MEMBER_REQUEST":
        url = `${host}/group/changeWhoCanApproveMemberRequest`;
        data = {
          groupId,
          whoCanApproveMemberRequest:
            value === "all" ? "anyoneInGroup" : "adminsAndModerator",
        };
        break;
      case "WHO_CAN_POST":
        url = `${host}/group/changeWhoCanPost`;
        data = {
          groupId,
          whoCanPost: value === "all" ? "anyoneInGroup" : "adminsAndModerator",
        };
        break;
      case "NAME":
        url = `${host}/group/updateName`;
        data = {
          groupId,
          name: value,
        };
        break;
      case "DESCRIPTION":
        url = `${host}/group/updateDescription`;
        data = {
          groupId,
          description: value,
        };
        break;
      case "COVER":
        url = `${host}/group/updateCoverPhoto`;
        var formData = new FormData();
        formData.append("groupId", groupId);
        formData.append("assets", value.originalFile);

        data = formData;
        break;

      default:
        break;
    }
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      changeSetting(value, type);
      // rejectJoinRequest(userData);

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

  const addDescription = async (description) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(
        `${host}/group/addDescription`,
        { description, groupId },

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      addDescription_(description);

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
  const addCover = async (cover) => {
    var formData = new FormData();
    formData.append("groupId", groupId);
    formData.append("assets", cover.originalFile);
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/group/addCoverPhoto`,
        formData,

        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      addCover_(response.data.link);

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
  const inviteFriend = async (addresseeId) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/group/inviteUser`,
        { addresseeId, groupId },

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
  const leaveGroup = async () => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/group/leaveGroup`,
        { groupId },

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
  const deleteGroup = async () => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.delete(`${host}/group/deleteGroup`, {
        data: { groupId },
        headers: { Authorization: `Bearer ${getToken()}` },
      });

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

  const addReport = async (groupId, postId, description) => {
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");

    try {
      const response = await axios.post(
        `${host}/group/reportPost`,
        { groupId, postId, description },

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
  return {
    isLoading,
    getgroupInformation,
    sendJoinRequest,
    cancelJoinRequest,
    deleteReport,
    deleteAdminReport,
    deletePost,
    blockMemberOrAdmin,
    upgradeMemberToAdmin,
    downgradeAdminToMember,
    unblockAMember,
    acceptPinnedPost,
    rejectPinnedPost,
    acceptJoiningRequest,
    rejectJoiningRequest,
    changeSettings,
    addDescription,
    addCover,
    inviteFriend,
    leaveGroup,
    deleteGroup,
    addReport,
  };
};

export default useGroup;
