import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { getToken } from "../util/help";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { GroupContext } from "../context/GroupContext";

const useFetchedPost = (url, type) => {
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
    addFriendsRequestSend,
    addFriendsRequestRecieve,
  } = useContext(ProfileContext);

  const {
    addGroupPosts,
    addGroupMembers,
    addGroupAdmins,
    addGroupModerator,
    addGroupReports,
    addGroupBlockedUsers,
    addGroupPinnedPosts,
    addGroupYourPinnedPosts,
    addGroupJoiningRequests,
    addGroupAdminReports,
    addGroupFriendsNotJoined,
    groupMembers,
    groupPosts,
    groupAdmins,
    groupModerator,
    groupReports,
    groupAdminReports,
    groupBlockedUsers,
    groupPinnedPosts,
    groupYourPinnedPosts,
    groupJoiningRequests,
    groupFriendsNotJoin,
  } = useContext(GroupContext);
  const getpostFromFirstPage = useCallback(async () => {
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
        addJoinedPages(response.data.pages, response.data.extraInfo.totalItems);
      }
      if (response.data.pages && url.includes("getPagesIOwned")) {
        addOwnedPages(response.data.pages, response.data.extraInfo.totalItems);
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

      if (response.data.posts && url.includes("/group/posts/")) {
        addGroupPosts(
          response.data.posts,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.members) {
        addGroupMembers(
          response.data.members,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.admins) {
        addGroupAdmins(
          response.data.admins,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.moderator) {
        addGroupModerator(response.data.moderator, 1, false, true);
      }

      if (response.data.reports) {
        addGroupReports(
          response.data.reports,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      if (response.data.adminReports) {
        addGroupAdminReports(
          response.data.adminReports,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.membersBlocked) {
        addGroupBlockedUsers(
          response.data.membersBlocked,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.requestPosts) {
        addGroupPinnedPosts(
          response.data.requestPosts,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.YourRequestPosts) {
        addGroupYourPinnedPosts(
          response.data.YourRequestPosts,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.joiningRequests) {
        addGroupJoiningRequests(
          response.data.joiningRequests,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.friendsNotJoin) {
        addGroupFriendsNotJoined(
          response.data.friendsNotJoin,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
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
  }, [
    AddGroupInvites,
    AddPageInvites,
    addFriendsRequestRecieve,
    addFriendsRequestSend,
    addGroupMembers,
    addGroupPosts,
    addJoinedGroups,
    addJoinedPages,
    addOwnedPages,
    navigate,
    url,
    addGroupAdmins,
    addGroupModerator,
    addGroupReports,
    addGroupAdminReports,
    addGroupBlockedUsers,
    addGroupPinnedPosts,
    addGroupYourPinnedPosts,
    addGroupJoiningRequests,
    addGroupFriendsNotJoined,
  ]);
  useEffect(() => {
    if (groupMembers.firstTime === true && type === "MEMBERS") {
      return;
    }
    if (groupPosts.firstTime === true && type === "POSTS") {
      return;
    }
    if (groupAdmins.firstTime === true && type === "ADMINS") {
      return;
    }
    if (groupModerator.firstTime === true && type === "MODERATOR") {
      return;
    }
    if (groupReports.firstTime === true && type === "REPORTS") {
      return;
    }
    if (groupAdminReports.firstTime === true && type === "ADMIN_REPORTS") {
      return;
    }
    if (groupBlockedUsers.firstTime === true && type === "BLOCKED_USERS") {
      return;
    }
    if (groupPinnedPosts.firstTime === true && type === "PINNED_POSTS") {
      return;
    }
    if (
      groupFriendsNotJoin.firstTime === true &&
      type === "FRIEND_NOT_JOINED"
    ) {
      return;
    }
    if (
      groupYourPinnedPosts.firstTime === true &&
      type === "YOUR_PINNED_POSTS"
    ) {
      return;
    }
    if (
      groupJoiningRequests.firstTime === true &&
      type === "JOINING_REQUESTS"
    ) {
      return;
    }
    getpostFromFirstPage();
  }, [
    getpostFromFirstPage,
    groupMembers,
    groupPosts,
    groupAdmins,
    groupModerator,
    groupReports,
    groupAdminReports,
    groupBlockedUsers,
    groupPinnedPosts,
    groupYourPinnedPosts,
    groupJoiningRequests,
    groupFriendsNotJoin,
    type,
  ]);

  const handleScroll = useCallback(async () => {
    // const scrollTop =
    //   (document.documentElement && document.documentElement.scrollTop) ||
    //   document.body.scrollTop;

    // const scrollHeight =
    //   (document.documentElement && document.documentElement.scrollHeight) ||
    //   document.body.scrollHeight;

    // const clientHeight =
    //   document.documentElement.clientHeight || window.innerHeight;

    // const scrolledToBottom =
    //   Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
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
        if (response.data.posts && url.includes("/group/posts/")) {
          addGroupPosts(
            response.data.posts,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.members) {
          addGroupMembers(
            response.data.members,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.admins) {
          addGroupAdmins(
            response.data.admins,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.moderator) {
          addGroupModerator(response.data.moderator, 1, false, true);
        }
        if (response.data.reports) {
          addGroupReports(
            response.data.reports,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.membersBlocked) {
          addGroupBlockedUsers(
            response.data.membersBlocked,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.requestPosts) {
          addGroupPinnedPosts(
            response.data.requestPosts,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.YourRequestPosts) {
          addGroupYourPinnedPosts(
            response.data.YourRequestPosts,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.joiningRequests) {
          addGroupJoiningRequests(
            response.data.joiningRequests,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.adminReports) {
          addGroupAdminReports(
            response.data.adminReports,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.friendsNotJoin) {
          addGroupFriendsNotJoined(
            response.data.friendsNotJoin,
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
    AddGroupInvites,
    AddPageInvites,
    addJoinedPages,
    addJoinedGroups,
    addOwnedPages,
    addFriendsRequestSend,
    addFriendsRequestRecieve,
    addGroupPosts,
    addGroupMembers,
    addGroupAdmins,
    addGroupModerator,
    addGroupReports,
    addGroupBlockedUsers,
    addGroupPinnedPosts,
    addGroupYourPinnedPosts,
    addGroupJoiningRequests,
    addGroupAdminReports,
    addGroupFriendsNotJoined,
  ]);

  useEffect(() => {
    if (!groupMembers.hasMore && type === "MEMBERS") {
      return;
    }
    if (!groupPosts.hasMore && type === "POSTS") {
      return;
    }
    if (!groupAdmins.hasMore && type === "ADMINS") {
      return;
    }
    if (!groupModerator.hasMore && type === "MODERATOR") {
      return;
    }
    if (!groupReports.hasMore && type === "REPORTS") {
      return;
    }
    if (!groupAdminReports.hasMore && type === "ADMIN_REPORTS") {
      return;
    }
    if (!groupBlockedUsers.hasMore && type === "BLOCKED_USERS") {
      return;
    }
    if (!groupPinnedPosts.hasMore && type === "PINNED_POSTS") {
      return;
    }
    if (!groupYourPinnedPosts.hasMore && type === "YOUR_PINNED_POSTS") {
      return;
    }
    if (!groupJoiningRequests.hasMore && type === "JOINING_REQUESTS") {
      return;
    }
    if (!groupFriendsNotJoin.hasMore && type === "FRIEND_NOT_JOINED") {
      return;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    handleScroll,
    groupMembers,
    groupPosts,
    groupAdmins,
    groupModerator,
    groupReports,
    groupBlockedUsers,
    groupPinnedPosts,
    groupYourPinnedPosts,
    groupJoiningRequests,
    groupAdminReports,
    groupFriendsNotJoin,
    type,
  ]);

  return { data, loading, friends };
};

export default useFetchedPost;
