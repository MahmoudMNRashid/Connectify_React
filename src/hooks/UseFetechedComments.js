import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, host } from "../util/help";
import { PostContext } from "../context/PostContext";

const useFetchedComments = () => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { postInformation, getComments, comments } = useContext(PostContext);

  const navigate = useNavigate();
  let url = host + "/post";
  postInformation.permission.postType === "group"
    ? (url =
        url +
        `/group/comments/${postInformation.groupContent.groupId}/${postInformation.postContent._idPost}`)
    : postInformation.permission.postType === "page"
    ? (url =
        url +
        `/page/comments/${postInformation.pageContent.pageId}/${postInformation.postContent._idPost}`)
    : (url =
        url +
        `/profile/comments/${postInformation.owner.userId}/${postInformation.postContent._idPost}`);
  const getCommentsFromFirstPage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + "?page=1", {
        headers: { Authorization: "Bearer " + getToken() },
      });

      getComments(
        response.data.comments,
        response.data.extraInfo.totalItems,
        response.data.extraInfo.hasNextPage,
        true
      );
    } catch (error) {
      console.log(error);
      // navigate("/error", {
      //   state: {
      //     status: error.response.status,
      //     message: error.response.data.message,
      //   },
      // });
    } finally {
      setLoading(false);
    }
  }, [url, getComments]);
  useEffect(() => {
    if (comments.firstTime === true) {
      return;
    }
    getCommentsFromFirstPage();
  }, [getCommentsFromFirstPage, comments]);

  const handleScroll = useCallback(async () => {
    const target = document.getElementById("allComments");
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);
      try {
        const response = await axios.get(`${url}?page=${page}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });

        getComments(
          response.data.comments,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        navigate("/error", {
          state: {
            status: error.response.status,
            message: error.response.data.message,
          },
        });
      } finally {
        setLoading(false);
      }
    }
  }, [navigate, loading, page, url, getComments]);
  useEffect(() => {
    if (!comments.hasMore) {
      return;
    }
    const mainContent = document.getElementById("allComments");
    mainContent.addEventListener("scroll", handleScroll);
    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, [handleScroll, comments]);

  return { loading };
};

export default useFetchedComments;
