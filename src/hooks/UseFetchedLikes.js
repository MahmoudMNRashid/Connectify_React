import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { getToken } from "../util/help";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const useFetchedLikes = (url) => {
  const { likes, addLikes } = useContext(PostContext);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getpostFromFirstPage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url + "?page=1"}`, {
        headers: { Authorization: "Bearer " + getToken() },
      });

      addLikes(
        response.data.likes,
        response.data.extraInfo.totalItems,
        response.data.extraInfo.hasNextPage,
        true
      );

      //   setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.log(error);
      navigate("/error", {
        state: {
          status: error.response.status,
          message: error.response.data.message,
        },
      });
    } finally {
      setLoading(false);
    }
  }, [url, navigate, addLikes]);
  useEffect(() => {
    if (likes.firstTime === true) {
      return;
    }

    if (url) {
      getpostFromFirstPage();
    }
  }, [getpostFromFirstPage, url, likes]);

  const handleScroll = useCallback(async () => {
    const target = document.getElementById("search_container");
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);

      try {
        const response = await axios.get(url + `&page=${page}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });
    
        addLikes(
          response.data.likes,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );

        setPage((prevPage) => prevPage + 1);

        setLoading(false);
      } catch (error) {
        console.log(error);
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
  }, [loading, navigate, url, page, addLikes]);

  useEffect(() => {
    if (!likes.hasMore) {
      return;
    }
    const mainContent = document.getElementById("search_container");
    mainContent.addEventListener("scroll", handleScroll);
    return () => mainContent.removeEventListener("scroll", handleScroll);
  }, [handleScroll, likes]);

  return { loading };
};

export default useFetchedLikes;
