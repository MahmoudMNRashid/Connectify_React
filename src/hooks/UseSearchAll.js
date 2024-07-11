import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { getToken } from "../util/help";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const useSearchAll = (url, type, startSearch) => {
  const {
    usersResult,
    groupsResult,
    pagesResult,
    addUsersResult,
    addGroupsResult,
    addPagesResult,
  } = useContext(MainContext);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getpostFromFirstPage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url + "&page=1"}`, {
        headers: { Authorization: "Bearer " + getToken() },
      });

      console.log(response);
      if (response.data.pages && type === "PAGE") {
        addPagesResult(
          response.data.pages,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      if (response.data.groups && type === "GROUP") {
        addGroupsResult(
          response.data.groups,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.users && type === "USER") {
        addUsersResult(
          response.data.users,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
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
  }, [url, navigate, addPagesResult, addGroupsResult, addUsersResult, type]);
  useEffect(() => {
    if (pagesResult.firstTime === true && type === "PAGE") {
      return;
    }
    if (groupsResult.firstTime === true && type === "GROUP") {
      return;
    }
    if (usersResult.firstTime === true && type === "USER") {
      return;
    }

    if (startSearch) {
      getpostFromFirstPage();
    }
  }, [
    getpostFromFirstPage,
    url,
    startSearch,
    pagesResult,
    groupsResult,
    usersResult,
    type,
  ]);

  const handleScroll = useCallback(async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);

      try {
        const response = await axios.get(url + `&page=${page}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });
        console.log(response);
        if (response.data.pages && type === "PAGE") {
          addPagesResult(
            response.data.pages,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }

        if (response.data.groups && type === "GROUP") {
          addGroupsResult(
            response.data.groups,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.users && type === "USER") {
          addUsersResult(
            response.data.users,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
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
  }, [
    loading,
    navigate,
    url,
    page,
    type,
    addGroupsResult,
    addPagesResult,
    addUsersResult,
  ]);

  useEffect(() => {
    if (!pagesResult.hasMore) {
      return;
    }
    if (!groupsResult.hasMore) {
      return;
    }
    if (!usersResult.hasMore) {
      return;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, pagesResult, groupsResult, usersResult]);

  return { loading };
};

export default useSearchAll;
