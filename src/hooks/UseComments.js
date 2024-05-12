import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import axios from "axios";
import { getToken, host } from "../util/help";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useComments = (
  selectedAssets,
  description,
  clearAssets,
  clearDescription
) => {
  const { postInformation } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleApiCreateComment = async (event) => {
    event.preventDefault();
    console.log(postInformation);

    const formData = new FormData();

    selectedAssets.forEach((file) => {
      formData.append("assets", file);
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

    setIsLoading(true);
    try {
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      //update comments array from context and number of comment
      clearAssets([]);
      clearDescription("");
      toast.success(response.data.message);
      console.log(response);
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
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createComment: handleApiCreateComment,
  };
};

export default useComments;
