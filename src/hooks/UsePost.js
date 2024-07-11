import { useCallback, useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import toast from "react-hot-toast";
import { getToken, host, localHost } from "../util/help";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import { GroupContext } from "../context/GroupContext";
import { PageContext } from "../context/PageContext";
import { ProfileContext } from "../context/ProfileContext";

const usePost = () => {
  let { pageId } = useParams();
  let { groupId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { postInformation } = useContext(PostContext);
  const { startTheDisable, stopTheDisable, closeModal } =
    useContext(MainContext);
  const navigate = useNavigate();

  const { deletePost_, updatePost_, createPost_ } = useContext(PostContext);
  const { deletePost__, updatePost__, createPost__, groupInformation } =
    useContext(GroupContext);
  const { deletePost___, updatePost___, createPost___, pageInformation } =
    useContext(PageContext);
  const { deletePost____, updatePost____, createPost____ } =
    useContext(ProfileContext);
  //Function
  const startLoadingAndDisable = useCallback(() => {
    setIsLoading(true);
    startTheDisable();
  }, [startTheDisable]);

  const stopLoadingAndDisable = useCallback(() => {
    setIsLoading(false);
    stopTheDisable();
  }, [stopTheDisable]);

  const deletePost = async (type, postId, pageId, groupId, place) => {
    console.log("fff");
    const data =
      type === "group"
        ? { groupId, postId }
        : type === "page"
        ? { pageId, postId }
        : { postId };

    const url =
      type === "group"
        ? `${host}/post/group/deletePost`
        : type === "page"
        ? `${host}/post/page/deletePost`
        : `${host}/post/profile/deletePost`;
    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.delete(url, {
        data,
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success(response.data.message, { id: toastId });
      if (place === "group") {
        deletePost__(postId);
      } else if (place === "page") {
        deletePost___(postId);
      } else if (place === "profile") {
        deletePost____(postId);
      }
      deletePost_(postId);
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

  const updatePost = async (
    newAssets,
    description,
    postId,
    whoCanComment,
    whoCanSee
  ) => {
    // handle assets
    const mainAssets = postInformation.postContent.assets;
    const postType = postInformation.permission.postType;
    const place = postInformation.place;
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

    deletedAssets.length > 0
      ? formData.append("deletedAssets", JSON.stringify(deletedAssets))
      : null;

    formData.append("description", description);

    formData.append("postId", postId);

    if (postType === "group") {
      formData.append("groupId", postInformation.groupContent.groupId);
    } else if (postType === "page") {
      formData.append("pageId", postInformation.pageContent.pageId);
    }

    if (postType === "page" || postType === "profile") {
      formData.append("whoCanSee", whoCanSee);
      formData.append("whoCanComment", whoCanComment);
    }

    let url = host + "/post";
    postType === "group"
      ? (url = url + "/group/updatePost")
      : postType === "page"
      ? (url = url + "/page/updatePost")
      : (url = url + "/profile/updatePost");

    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success(response.data.message, { id: toastId });
      console.log(place);
      closeModal();
      if (place === "group") {
        updatePost__(response.data.post);
      } else if (place === "page") {
        updatePost___(response.data.post);
      } else if (place === "profile") {
        updatePost____(response.data.post);
      }
      updatePost_(response.data.post);
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

  const createPost = async (
    newAssets,
    description,
    whoCanComment,
    whoCanSee
  ) => {
    const place = postInformation.place;

    const formData = new FormData();
    newAssets.length > 0
      ? newAssets.forEach((file) => {
          formData.append("assets", file.originalFile);
        })
      : null;

    formData.append("description", description);

    if (place === "group") {
      formData.append("groupId", groupId);
    } else if (place === "page") {
      formData.append("pageId", pageId);
    }

    if (place === "page" || place === "profile" || place === "home") {
      formData.append("whoCanSee", whoCanSee);
      formData.append("whoCanComment", whoCanComment);
    }

    let url = localHost + "/post";
    place === "group"
      ? (url = url + "/group/createPost")
      : place === "page"
      ? (url = url + "/page/createPost")
      : (url = url + "/profile/createPost");

    startLoadingAndDisable();
    var toastId = toast.loading("Wait...");
    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      toast.success(response.data.message, { id: toastId });
      console.log(response);
      console.log(response.data.post);
      closeModal();
      if (place === "group") {
        createPost__(JSON.parse(response.data.post));
        createPost_(JSON.parse(response.data.post), place, groupInformation);
      } else if (place === "page") {
        createPost___(JSON.parse(response.data.post));
        createPost_(JSON.parse(response.data.post), place, pageInformation);
      } else if (place === "profile" || place === "home") {
        createPost____(JSON.parse(response.data.post));
        createPost_(JSON.parse(response.data.post), place);
      }
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
//   const searchInPost = async (
//  word
//   ) => {
//     const place = postInformation.place;



//     if (place === "group") {
//       formData.append("groupId", groupId);
//     } else if (place === "page") {
//       formData.append("pageId", pageId);
//     }

//     if (place === "page" || place === "profile" || place === "home") {
//       formData.append("whoCanSee", whoCanSee);
//       formData.append("whoCanComment", whoCanComment);
//     }

//     let url = localHost + "/post";
//     place === "group"
//       ? (url = url + "/group/createPost")
//       : place === "page"
//       ? (url = url + "/page/createPost")
//       : (url = url + "/profile/createPost");

//     startLoadingAndDisable();
//     var toastId = toast.loading("Wait...");
//     try {
//       const response = await axios.post(url, formData, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });

//       toast.success(response.data.message, { id: toastId });
//       console.log(response);
//       console.log(response.data.post);
//       closeModal();
//       if (place === "group") {
//         createPost__(JSON.parse(response.data.post));
//         createPost_(JSON.parse(response.data.post), place, groupInformation);
//       } else if (place === "page") {
//         createPost___(JSON.parse(response.data.post));
//         createPost_(JSON.parse(response.data.post), place, pageInformation);
//       } else if (place === "profile" || place === "home") {
//         createPost____(JSON.parse(response.data.post));
//         createPost_(JSON.parse(response.data.post), place);
//       }
//     } catch (error) {
//       if (error.response?.status === 403 || error.response?.status === 401) {
//         navigate("/error", {
//           state: {
//             status: error.response.status,
//             message: error.response.data.message,
//           },
//           replace: true,
//         });
//       }
//       toast.error(error.response?.data.message || "Something went wrong", {
//         id: toastId,
//       });
//     } finally {
//       stopLoadingAndDisable();
//     }
//   };

  return {
    isLoading,
    deletePost,
    updatePost,
    createPost,
  };
};

export default usePost;
