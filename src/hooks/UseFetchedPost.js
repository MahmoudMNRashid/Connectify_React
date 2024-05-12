import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getToken, host } from "../util/help";
import { useNavigate } from "react-router-dom";

const useFetchedPost = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getpostFromFirstPage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${host}/profile/homePosts?page=1`, {
          headers: { Authorization: "Bearer " + getToken() },
        });
        setData((prevData) => [
          ...prevData,
          ...response.data.aggregationResult,
        ]);
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
    };

    getpostFromFirstPage();
  }, [navigate]);

  const handleScroll = useCallback(async () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !loading) {
      setLoading(true);
      try {
        const response = await axios.get(
          `${host}/profile/homePosts?page=${page}`,
          {
            headers: { Authorization: "Bearer " + getToken() },
          }
        );
        setData((prevData) => [
          ...prevData,
          ...response.data.aggregationResult,
        ]);

        setPage((prevPage) => prevPage + 1);

        setLoading(false);
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
  }, [loading, page, navigate]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { data, loading };
};

export default useFetchedPost;
