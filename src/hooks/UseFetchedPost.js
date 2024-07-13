import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { getToken } from "../util/help";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { GroupContext } from "../context/GroupContext";
import { PageContext } from "../context/PageContext";
import { PostContext } from "../context/PostContext";

const useFetchedPost = (url, type) => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    addFriends,
    AddGroupInvites,
    AddPageInvites,
    addJoinedPages,
    addJoinedGroups,
    addOwnedPages,
    addFriendsRequestSend,
    addFriendsRequestRecieve,
    addPosts: addProfilePosts,
    posts: profilePosts,
    friendsRequestSend,
    friendsRequestRecieve,
    joinedGroups,
    joinedPages,
    ownedPages,
    groupInvites,
    pageInvites,
    friends,
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

  const {
    pagePosts,
    pageFollowers,
    pageBlockedUsers,
    pageFriendsNotJoin,
    pageModerator,
    pageRates,
    addPagePosts,
    addPageFollowers,
    addPageBlockedUsers,
    addPageFriendsNotJoined,
    addPageModerator,
    addPageRates,
  } = useContext(PageContext);

  const { addPosts, posts } = useContext(PostContext);
  const getpostFromFirstPage = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url + "?page=1"}`, {
        headers: { Authorization: "Bearer " + getToken() },
      });
      console.log(response);
      if (response.data.homePosts) {
        addPosts(
          response.data.homePosts,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      if (response.data.posts && url.includes("/profile/posts")) {
        addProfilePosts(
          response.data.posts,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.followers) {
        addFriends(
          response.data.followers,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (
        response.data.Invites &&
        url.includes("getInvitationsSentToMeFromGroups")
      ) {
        AddGroupInvites(
          response.data.Invites,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (
        response.data.Invites &&
        url.includes("getInvitationsSentToMeFromPages")
      ) {
        AddPageInvites(
          response.data.Invites,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      if (response.data.pages && url.includes("getPagesLiked")) {
        addJoinedPages(
          response.data.pages,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.pages && url.includes("getPagesIOwned")) {
        addOwnedPages(
          response.data.pages,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      if (response.data.groups) {
        addJoinedGroups(
          response.data.groups,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.friendsRequestSend) {
        addFriendsRequestSend(
          response.data.friendsRequestSend,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.friendsRequestRecieve) {
        addFriendsRequestRecieve(
          response.data.friendsRequestRecieve,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      /////////////////////////////////////////
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
      if (response.data.posts && url.includes("/page/posts")) {
        addPagePosts(
          response.data.posts,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      if (response.data.followers && url.includes("/page/followers")) {
        addPageFollowers(
          response.data.followers,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.blockedUsers && url.includes("/page/usersBlocked")) {
        addPageBlockedUsers(
          response.data.blockedUsers,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (
        response.data.friendsNotJoin &&
        url.includes("/page/friendsWhoDidNotLike")
      ) {
        addPageFriendsNotJoined(
          response.data.friendsNotJoin,
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }
      if (response.data.moderator && url.includes("/page/moderator")) {
        addPageModerator(response.data.moderator, 1, false, true);
      }
      if (response.data.rates && url.includes("page/rates")) {
        addPageRates(
          { rates: response.data.rates, avgRate: response.data.avgRate || 0 },
          response.data.extraInfo.totalItems,
          response.data.extraInfo.hasNextPage,
          true
        );
      }

      setPage((prevPage) => prevPage + 1);
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
  }, [
    url,
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
    addGroupAdmins,
    addGroupModerator,
    addGroupReports,
    addGroupAdminReports,
    addGroupBlockedUsers,
    addGroupPinnedPosts,
    addGroupYourPinnedPosts,
    addGroupJoiningRequests,
    addGroupFriendsNotJoined,
    addPagePosts,
    addPageFollowers,
    addPageBlockedUsers,
    addPageFriendsNotJoined,
    addPageModerator,
    addPageRates,
    addPosts,
    addProfilePosts,
    addFriends,
  ]);
  useEffect(() => {
    if (profilePosts.firstTime === true && type === "PROFILE_POSTS") {
      return;
    }
    if (friends.firstTime === true && type === "FRIENDS") {
      return;
    }
    if (pageInvites.firstTime === true && type === "PAGE_INVITATIONS") {
      return;
    }
    if (groupInvites.firstTime === true && type === "GROUP_INVITATIONS") {
      return;
    }
    if (ownedPages.firstTime === true && type === "OWNED_PAGES") {
      return;
    }
    if (joinedPages.firstTime === true && type === "JOINED_PAGES") {
      return;
    }
    if (joinedGroups.firstTime === true && type === "JOINED_GROUPS") {
      return;
    }
    if (
      friendsRequestRecieve.firstTime === true &&
      type === "INCOMING_REQUESTS"
    ) {
      return;
    }
    if (friendsRequestSend.firstTime === true && type === "OUTGOING_REQUESTS") {
      return;
    }
    if (posts.firstTime === true && type === "HOME_POSTS") {
      return;
    }
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
    if (pagePosts.firstTime === true && type === "POSTS_PAGE") {
      return;
    }
    if (pageFollowers.firstTime === true && type === "FOLLOWERS") {
      return;
    }
    if (pageBlockedUsers.firstTime === true && type === "BLOCKED_USERS_PAGE") {
      return;
    }
    if (
      pageFriendsNotJoin.firstTime === true &&
      type === "FRIEND_NOT_JOINED_PAGE"
    ) {
      return;
    }
    if (pageModerator.firstTime === true && type === "MODERATOR_PAGE") {
      return;
    }
    if (pageRates.firstTime === true && type === "RATES") {
      return;
    }
    if (url) {
      getpostFromFirstPage();
    }
  }, [
    getpostFromFirstPage,
    type,
    url,
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
    pagePosts,
    pageFollowers,
    pageBlockedUsers,
    pageFriendsNotJoin,
    pageModerator,
    pageRates,
    posts,
    profilePosts,
    friendsRequestRecieve,
    friendsRequestSend,
    ownedPages,
    joinedPages,
    joinedGroups,
    friends,
    groupInvites,
    pageInvites,
  ]);

  const handleScroll = useCallback(async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      setLoading(true);
      try {
        const response = await axios.get(url + `?page=${page}`, {
          headers: { Authorization: "Bearer " + getToken() },
        });

        if (response.data.posts && url.includes("/profile/posts")) {
          addProfilePosts(
            response.data.posts,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.homePosts) {
          addPosts(
            response.data.homePosts,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }

        if (response.data.followers) {
          addFriends(
            response.data.followers,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (
          response.data.Invites &&
          url.includes("getInvitationsSentToMeFromGroups")
        ) {
          AddGroupInvites(
            response.data.Invites,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (
          response.data.Invites &&
          url.includes("getInvitationsSentToMeFromPages")
        ) {
          AddPageInvites(
            response.data.Invites,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }

        if (response.data.pages && url.includes("getPagesLiked")) {
          addJoinedPages(
            response.data.pages,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.pages && url.includes("getPagesIOwned")) {
          addOwnedPages(
            response.data.pages,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }

        if (response.data.groups) {
          addJoinedGroups(
            response.data.groups,
            response.data.extraInfo.totalItems,

            response.data.extraInfo.hasNextPage,
            true
          );
        }

        if (response.data.friendsRequestSend) {
          addFriendsRequestSend(
            response.data.friendsRequestSend,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.friendsRequestRecieve) {
          addFriendsRequestRecieve(
            response.data.friendsRequestRecieve,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }

        /////////////////////////
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
        if (response.data.posts && url.includes("/page/posts")) {
          addPagePosts(
            response.data.posts,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.followers && url.includes("/page/followers")) {
          addPageFollowers(
            response.data.followers,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.blockedUsers && url.includes("/page/usersBlocked")) {
          addPageBlockedUsers(
            response.data.blockedUsers,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (
          response.data.friendsNotJoin &&
          url.includes("/page/friendsWhoDidNotLike")
        ) {
          addPageFriendsNotJoined(
            response.data.friendsNotJoin,
            response.data.extraInfo.totalItems,
            response.data.extraInfo.hasNextPage,
            true
          );
        }
        if (response.data.moderator && url.includes("/page/moderator")) {
          addPageModerator(response.data.moderator, 1, false, true);
        }
        if (response.data.rates && url.includes("page/rates")) {
          addPageRates(
            { rates: response.data.rates, avgRate: response.data.avgRate || 0 },
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
    addPagePosts,
    addPageFollowers,
    addPageBlockedUsers,
    addPageFriendsNotJoined,
    addPageModerator,
    addPageRates,
    addPosts,
    addProfilePosts,
    addFriends,
  ]);

  useEffect(() => {
    if (!friends.hasMore && type === "FRIENDS") {
      return;
    }
    if (!groupInvites.hasMore && type === "GROUP_INVITATIONS") {
      return;
    }
    if (!pageInvites.hasMore && type === "PAGE_INVITATIONS") {
      return;
    }
    if (!ownedPages.hasMore && type === "OWNED_PAGES") {
      return;
    }
    if (!joinedPages.hasMore && type === "JOINED_PAGES") {
      return;
    }
    if (!joinedGroups.hasMore && type === "JOINED_GROUPS") {
      return;
    }
    if (!friendsRequestRecieve.hasMore && type === "INCOMING_REQUESTS") {
      return;
    }
    if (!friendsRequestSend.hasMore && type === "OUTGOING_REQUESTS") {
      return;
    }
    if (!profilePosts.hasMore && type === "PROFILE_POSTS") {
      return;
    }
    if (!posts.hasMore && type === "HOME_POSTS") {
      return;
    }
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
    if (!pagePosts.hasMore && type === "POSTS_PAGE") {
      return;
    }
    if (!pageFollowers.hasMore && type === "FOLLOWERS") {
      return;
    }
    if (!pageBlockedUsers.hasMore && type === "BLOCKED_USERS_PAGE") {
      return;
    }
    if (!pageFriendsNotJoin.hasMore && type === "FRIEND_NOT_JOINED_PAGE") {
      return;
    }
    if (!pageModerator.hasMore && type === "MODERAOTR_PAGE") {
      return;
    }
    if (!pageRates.hasMore && type === "RATES") {
      return;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    handleScroll,
    type,
    posts,
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
    pagePosts,
    pageFollowers,
    pageBlockedUsers,
    pageFriendsNotJoin,
    pageModerator,
    pageRates,
    profilePosts,
    friendsRequestRecieve,
    friendsRequestSend,
    ownedPages,
    joinedGroups,
    joinedPages,
    friends,
    groupInvites,
    pageInvites,
  ]);

  return { loading };
};

export default useFetchedPost;
