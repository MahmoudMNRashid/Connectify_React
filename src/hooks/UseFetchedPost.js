import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { getToken } from "../util/help";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";

const useFetchedPost = (url) => {
  console.log(url);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [friends, setFriends] = useState({ friends: [], total: 0 });
  const {
    AddGroupInvites,
    AddPageInvites,
    addJoinedPages,
    addJoinedGroups,
    addOwnedPages,
    addFriendsRequestSend,addFriendsRequestRecieve
  } = useContext(ProfileContext);
  useEffect(() => {
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
              total: response.data.extraInfo.totalItems,
            };

            return newFriends;
          });
        }
        if (
          response.data.Invites &&
          url.includes("getInvitationsSentToMeFromGroups")
        ) {
          console.log("dasdasdasda");
          AddGroupInvites(
            response.data.Invites,
            response.data.extraInfo.totalItems
          );
        }
        if (
          response.data.Invites &&
          url.includes("getInvitationsSentToMeFromPages")
        ) {
          AddPageInvites(
            response.data.Invites,
            response.data.extraInfo.totalItems
          );
        }

        if (response.data.pages && url.includes("getPagesLiked")) {
          addJoinedPages(
            response.data.pages,
            response.data.extraInfo.totalItems
          );
        }
        if (response.data.pages && url.includes("getPagesIOwned")) {
          addOwnedPages(
            response.data.pages,
            response.data.extraInfo.totalItems
          );
        }

        if (response.data.groups) {
          addJoinedGroups(
            response.data.groups,
            response.data.extraInfo.totalItems
          );
        }
        if (response.data.friendsRequestSend) {
          addFriendsRequestSend(
            response.data.friendsRequestSend,
            response.data.extraInfo.totalItems
          );
        }
        if (response.data.friendsRequestRecieve) {
          addFriendsRequestRecieve(
            response.data.friendsRequestRecieve,
            response.data.extraInfo.totalItems
          );
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
  }, [
    navigate,
    url,
    AddGroupInvites,
    AddPageInvites,
    addJoinedPages,
    addJoinedGroups,
    addOwnedPages,
    addFriendsRequestSend,addFriendsRequestRecieve
  ]);

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
              total: response.data.extraInfo.totalItems,
            };

            return newFriends;
          });
        }
        if (
          response.data.Invites &&
          url.includes("getInvitationsSentToMeFromGroups")
        ) {
          console.log("dasddadads");
          AddGroupInvites(
            response.data.Invites,
            response.data.extraInfo.totalItems
          );
        }
        if (
          response.data.Invites &&
          url.includes("getInvitationsSentToMeFromPages")
        ) {
          AddPageInvites(
            response.data.Invites,
            response.data.extraInfo.totalItems
          );
        }
        if (response.data.pages && url.includes("getPagesLiked")) {
          addJoinedPages(
            response.data.pages,
            response.data.extraInfo.totalItems
          );
        }
        if (response.data.pages && url.includes("getPagesIOwned")) {
          addOwnedPages(
            response.data.pages,
            response.data.extraInfo.totalItems
          );
        }

        if (response.data.groups) {
          addJoinedGroups(
            response.data.groups,
            response.data.extraInfo.totalItems
          );
        }

        if (response.data.friendsRequestSend) {
          addFriendsRequestSend(
            response.data.friendsRequestSend,
            response.data.extraInfo.totalItems
          );
        }
        if (response.data.friendsRequestRecieve) {
          addFriendsRequestRecieve(
            response.data.friendsRequestRecieve,
            response.data.extraInfo.totalItems
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
    AddGroupInvites,
    AddPageInvites,
    addJoinedPages,
    addJoinedGroups,
    addOwnedPages,
    addFriendsRequestSend,addFriendsRequestRecieve
  ]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { data, loading, friends };
};

export default useFetchedPost;
