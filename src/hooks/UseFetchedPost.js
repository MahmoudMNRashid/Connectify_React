import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getToken } from "../util/help";
import { useNavigate } from "react-router-dom";

const useFetchedPost = (url) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [friends, setFriends] = useState({ friends: [], total: 0 });
  useEffect(() => {
    console.log("one");
    const getpostFromFirstPage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url + "?page=1"}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });

        console.log(response);
        let posts;
        if (response.data.aggregationResult) {
          posts = [...response.data.aggregationResult];
        } else if (response.data.posts) {
          console.log("yyyyyyyyyyyyy");
          posts = [...response.data.posts];
        }

        if (response.data.aggregationResult || response.data.posts) {
          setData((prevData) => [...prevData, ...posts]);
        }

        if (response.data.followers) {
          setFriends((prev) => {
            const oldFriends = { ...prev };

            const newFriends = {
              friends: [...oldFriends.friends, ...response.data.followers],
              total: oldFriends.total,
            };
          
            return newFriends;
          });
        }
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
    };

    getpostFromFirstPage();
  }, [navigate, url]);

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
        const response = await axios.get(url + `?page=${page}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });
        let posts;
        if (response.data.aggregationResult) {
          posts = [...response.data.aggregationResult];
        } else if (response.data.posts) {
          console.log("yyyyyyyyyyyyy");
          posts = [...response.data.posts];
        }

        if (response.data.aggregationResult || response.data.posts) {
          setData((prevData) => [...prevData, ...posts]);
        }

        if (response.data.followers) {
          setFriends((prev) => {
            const oldFriends = { ...prev };

            const newFriends = {
              friends: [...oldFriends.friends, ...response.data.followers],
              total: oldFriends.total,
            };
          
            return newFriends;
          });
        }
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
  }, [loading, navigate, url, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { data, loading, friends };
};

export default useFetchedPost;
