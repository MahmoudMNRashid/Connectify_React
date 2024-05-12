import { useState } from "react";
import { getToken, host } from "../util/help";
import axios from "axios";
import toast from "react-hot-toast";

const useLikedUnLikedPost = ({
  isHeLikedInPost,
  numberOfLikes,
  postType,
  _idPost,
  pageId,
  groupId,
  userId,
}) => {
  const [isHeLiked, setIsHeLiked] = useState(isHeLikedInPost);
  const [likesNumber, setLikesNumber] = useState(numberOfLikes);
  const [loading, setloading] = useState(false);

  const handleAddLikeOrRemoveLike = async () => {
    const type = isHeLiked ? "unlikePost" : "likePost";
    const dataType =
      postType === "profile"
        ? { postId: _idPost, profileId: userId }
        : postType === "page"
        ? { postId: _idPost, pageId: pageId }
        : { postId: _idPost, groupId: groupId };

    try {
      setloading(true);
      setIsHeLiked((prev) => !prev);
      type === "likePost"
        ? setLikesNumber((prev) => prev + 1)
        : setLikesNumber((prev) => prev - 1);

      const response = await axios.post(
        `${host}/post/${postType}/${type}`,
        dataType,
        { headers: { Authorization: "Bearer " + getToken() } }
      );
      console.log(response);
    } catch (error) {
      setIsHeLiked((prev) => !prev);
      type === "likePost"
        ? setLikesNumber((prev) => prev + 1)
        : setLikesNumber((prev) => prev - 1);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return { isHeLiked, likesNumber, loading, handleAddLikeOrRemoveLike };
};

export default useLikedUnLikedPost;
