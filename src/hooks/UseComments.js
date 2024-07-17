import { useCallback, useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import axios from "axios";
import { getToken, host } from "../util/help";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const useComments = (
  selectedAssets,
  description,
  clearAssets,
  clearDescription
) => {
  const {
    postInformation,
    deleteComment,
    updateComment,
    addComment,
    activeUpdatedComment,
    changeModeToCreate,
    addActiveupdatedComment,
  } = useContext(PostContext);

  const { startTheDisable, stopTheDisable } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const startLoadingAndDisable = useCallback(() => {
    setIsLoading(true);
    startTheDisable();
  }, [startTheDisable]);

  const stopLoadingAndDisable = useCallback(() => {
    setIsLoading(false);
    stopTheDisable();
  }, [stopTheDisable]);
  const handleApiCreateComment = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    selectedAssets.forEach((file) => {
      formData.append("assets", file.originalFile);
    });
    formData.append("postId", postInformation.postContent._idPost);
    formData.append("description", description);

    if (postInformation.permission.postType === "group") {
      formData.append("groupId", postInformation.groupContent.groupId);
    } else if (postInformation.permission.postType === "page") {
      formData.append("pageId", postInformation.pageContent.pageId);
    } else {
      formData.append("profileId", postInformation.owner.userId);
    }

    let url = host + "/post";
    postInformation.permission.postType === "group"
      ? (url = url + "/group/createComment")
      : postInformation.permission.postType === "page"
      ? (url = url + "/page/createComment")
      : (url = url + "/profile/createComment");

    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      //update comments array from context and number of comment
      clearAssets([]);
      clearDescription("");
      addComment(response.data.comment);
      toast.success(response.data.message, {
        id: toastId,
      });
      const miniPost = document.getElementById("miniPost");
      const allCommentsDiv = document.getElementById("allComments");
      allCommentsDiv.scrollTop = miniPost.offsetHeight;
    } catch (error) {
      console.log(error);

      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
        });
      }
      toast.error(error.response.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const handleApiDeleteComment = async (commentId) => {
    const TypeId =
      postInformation.permission.postType === "group"
        ? { groupId: postInformation.groupContent.groupId }
        : postInformation.permission.postType === "page"
        ? { pageId: postInformation.pageContent.pageId }
        : { profileId: postInformation.owner.userId };

    const comment = {
      _commentId: commentId,
      postId: postInformation.postContent._idPost,
      ...TypeId,
    };
    let url = host + "/post";
    postInformation.permission.postType === "group"
      ? (url = url + "/group/deleteComment")
      : postInformation.permission.postType === "page"
      ? (url = url + "/page/deleteComment")
      : (url = url + "/profile/deleteComment");
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.delete(url, {
        data: comment,
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      deleteComment(commentId);

      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      console.log(error);

      if (error.response.status === 403 || error.response.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
        });
      }
      toast.error(error.response.data.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      stopLoadingAndDisable();
    }
  };

  const handleApiUpdateComment = async (event) => {
    event.preventDefault();
    const mainAssets = activeUpdatedComment.comment.assets;
    const newAssets = selectedAssets;

    const deletedAssets = mainAssets.filter(
      (asset) =>
        !newAssets.some((newAsset) => newAsset.public_id === asset.public_id)
    );

    const newUploadAssets = newAssets.filter(
      (newAsset) =>
        !mainAssets.some(
          (mainAsset) => mainAsset.public_id === newAsset.public_id
        )
    );
    const formData = new FormData();

    newUploadAssets.length > 0
      ? newUploadAssets.forEach((file) => {
          formData.append("assets", file.originalFile);
        })
      : null;
    formData.append("postId", postInformation.postContent._idPost);
    formData.append("description", description);
    formData.append("_commentId", activeUpdatedComment.comment.commentId);

    deletedAssets.length > 0
      ? formData.append("deletedAssets", JSON.stringify(deletedAssets))
      : null;

    if (postInformation.permission.postType === "group") {
      formData.append("groupId", postInformation.groupContent.groupId);
    } else if (postInformation.permission.postType === "page") {
      formData.append("pageId", postInformation.pageContent.pageId);
    } else {
      formData.append("profileId", postInformation.owner.userId);
    }

    let url = host + "/post";
    postInformation.permission.postType === "group"
      ? (url = url + "/group/updateComment")
      : postInformation.permission.postType === "page"
      ? (url = url + "/page/updateComment")
      : (url = url + "/profile/updateComment");
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      //update comments array from context and number of comment
      clearAssets([]);
      clearDescription("");
      changeModeToCreate();
      addActiveupdatedComment({});

      toast.success(response.data.message), { id: toastId };

      updateComment(response.data.comment);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 403 || error.response?.status === 401) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
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
    createComment: handleApiCreateComment,
    deleteComment: handleApiDeleteComment,
    updateComment: handleApiUpdateComment,
  };
};

export default useComments;
