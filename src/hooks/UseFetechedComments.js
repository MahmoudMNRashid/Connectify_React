import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, host } from "../util/help";
import { PostContext } from "../context/PostContext";

const useFetchedComments = () => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { postInformation, getComments } = useContext(PostContext);

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
  useEffect(() => {
    const getCommentsFromFirstPage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url + "?page=1", {
          headers: { Authorization: "Bearer " + getToken() },
        });
        getComments(response.data.comments);
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
    };

    getCommentsFromFirstPage();
  }, [navigate, url, getComments]);

  const handleScroll = useCallback(async () => {
    const target =document.getElementById("allComments");
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
console.log(`${url}?page=${page}`)
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !loading) {
      setLoading(true);
      try {
        const response = await axios.get(`${url}?page=${page}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });
        console.log('second response',response)
        getComments(response.data.comments);
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
  }, [navigate,loading, page, url,getComments]);
  useEffect(() => {
    const mainContent = document.getElementById("allComments");
    console.log("first", mainContent);

    mainContent.addEventListener("scroll", handleScroll);
    return () =>  mainContent.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {  loading };
};

export default useFetchedComments;
