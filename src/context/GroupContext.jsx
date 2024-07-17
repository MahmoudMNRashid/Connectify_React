/* eslint-disable no-unused-vars */

import { createContext, useCallback, useState } from "react";
import { getFullName, getLogo, getUserId } from "../util/help";

export const GroupContext = createContext({
  groupInformation: {},
  groupPosts: { posts: [], total: 0, hasMore: true, firstTime: false },
  groupMembers: { members: [], total: 0, hasMore: true, firstTime: false },
  groupAdmins: { admins: [], total: 0, hasMore: true, firstTime: false },
  groupModerator: { moderator: {}, total: 0, hasMore: true, firstTime: false },
  groupReports: { reports: [], total: 0, hasMore: true, firstTime: false },
  groupAdminReports: { reports: [], total: 0, hasMore: true, firstTime: false },
  groupBlockedUsers: {
    blockedUsers: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  groupPinnedPosts: { posts: [], total: 0, hasMore: true, firstTime: false },
  groupYourPinnedPosts: {
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  groupJoiningRequests: {
    requests: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  groupFriendsNotJoin: {
    friends: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  addGroupInformation: (information) => {},
  handleRequestJoin: (message) => {},
  addGroupPosts: (newPosts) => {},
  addGroupMembers: (members) => {},
  addGroupAdmins: (admins) => {},
  addGroupModerator: (moderator) => {},
  addGroupReports: (reports) => {},
  addGroupAdminReports: (reports) => {},
  addGroupBlockedUsers: (blockedUsers) => {},
  addGroupPinnedPosts: (posts) => {},
  addGroupYourPinnedPosts: (posts) => {},
  addGroupJoiningRequests: (requests) => {},
  addGroupFriendsNotJoined: (friends) => {},
  removeReport: (reportId) => {},
  removeAdminReport: (reportId) => {},
  removePost: (postId) => {},
  removeMemberOrAdmin: (memberId, memberRole) => {},
  removeAllPostsForMember: (userId) => {},
  upgradeMember: (memberId) => {},
  downgradeAdmin: (adminId) => {},
  unblockMember: (memberId) => {},
  acceptPost: (postId) => {},
  rejectPost: (postId) => {},
  acceptJoinRequest: (userData) => {},
  rejectJoinRequest: (userData) => {},
  changeSetting: (value, type) => {},
  addDescription_: (description) => {},
  addCover_: (cover) => {},
  deletePost__: (postId) => {},
  updatePost__: (newPost) => {},
  createPost__: (newPost) => {},
  resetGroupStates: () => {},
});

export default function GroupContextProvider({ children }) {
  const [groupInformation, setGroupInformation] = useState({});
  const [groupPosts, setGroupPosts] = useState({
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupMembers, setGroupMembers] = useState({
    members: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupAdmins, setGroupAdmins] = useState({
    admins: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const [groupModerator, setGroupModerator] = useState({
    moderator: {},
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupReports, setGroupReports] = useState({
    reports: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupAdminReports, setGroupAdminReports] = useState({
    reports: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupBlockedUsers, setGroupBlockedUsers] = useState({
    blockedUsers: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupPinnedPosts, setGroupPinnedPosts] = useState({
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupYourPinnedPosts, setGroupYourPinnedPosts] = useState({
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupJoiningRequests, setGroupJoiningRequests] = useState({
    requests: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupFriendsNotJoin, setGroupFriendsNotJoin] = useState({
    friends: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const handleAddGroupInformation = useCallback((information) => {
    setGroupInformation(information);
  }, []);

  const handleRequestJoin = (message) => {
    setGroupInformation((prev) => {
      const groupInfo = { ...prev };

      if (message === "Request has been sent") {
        groupInfo.isHeSendRequestToJoined = true;
      }

      if (message === "Joining request has been Canceled") {
        groupInfo.isHeSendRequestToJoined = false;
      }

      if (message === "You joined the group") {
        groupInfo.isHeSendRequestToJoined = false;
        groupInfo.isHeInGroup = true;
        groupInfo.role = "member";
        groupInfo.hasInvited = false;
      }
      return groupInfo;
    });
  };

  const handleAddGroupPosts = useCallback(
    (newPosts, total, hasMore, firstTime) => {
      setGroupPosts((prev) => {
        return {
          posts: [...prev.posts, ...newPosts],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );

  const handleAddGroupMembers = useCallback(
    (newMembers, total, hasMore, firstTime) => {
      setGroupMembers((prev) => {
        return {
          members: [...prev.members, ...newMembers],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );

  const handleAddGroupAdmins = useCallback(
    (newAdmins, total, hasMore, firstTime) => {
      setGroupAdmins((prev) => {
        return {
          admins: [...prev.admins, ...newAdmins],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupModerator = useCallback(
    (newModerator, total, hasMore, firstTime) => {
      setGroupModerator((prev) => {
        return {
          moderator: newModerator,
          total: total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );

  const handleAddGroupReports = useCallback(
    (newReports, total, hasMore, firstTime) => {
      setGroupReports((prev) => {
        return {
          reports: [...prev.reports, ...newReports],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupAdminReports = useCallback(
    (newReports, total, hasMore, firstTime) => {
      setGroupAdminReports((prev) => {
        return {
          reports: [...prev.reports, ...newReports],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupBlockedUsers = useCallback(
    (newBlockedUsers, total, hasMore, firstTime) => {
      setGroupBlockedUsers((prev) => {
        return {
          blockedUsers: [...prev.blockedUsers, ...newBlockedUsers],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupPinnedPosts = useCallback(
    (newPosts, total, hasMore, firstTime) => {
      setGroupPinnedPosts((prev) => {
        return {
          posts: [...prev.posts, ...newPosts],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupYourPinnedPosts = useCallback(
    (newPosts, total, hasMore, firstTime) => {
      setGroupYourPinnedPosts((prev) => {
        return {
          posts: [...prev.posts, ...newPosts],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupJoiningRequests = useCallback(
    (newRequests, total, hasMore, firstTime) => {
      setGroupJoiningRequests((prev) => {
        return {
          requests: [...prev.requests, ...newRequests],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupFriendsNotJoined = useCallback(
    (newFriends, total, hasMore, firstTime) => {
      setGroupFriendsNotJoin((prev) => {
        return {
          friends: [...prev.friends, ...newFriends],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleRemoveReport = useCallback((reportId) => {
    setGroupReports((prev) => {
      const reports = [...prev.reports];
      const reportsLength = prev.total;
      const hasMore = prev.hasMore;
      const firstTime = prev.firstTime;

      const newReports = reports.filter((report) => {
        return report.reportId !== reportId;
      });

      return {
        reports: newReports,
        total: reportsLength - 1,
        hasMore,
        firstTime: newReports.length === 0 ? false : firstTime,
      };
    });
  }, []);
  const handleRemoveAdminReport = useCallback((reportId) => {
    setGroupAdminReports((prev) => {
      const reports = [...prev.reports];
      const reportsLength = prev.total;
      const hasMore = prev.hasMore;
      const firstTime = prev.firstTime;

      const newReports = reports.filter((report) => {
        return report.reportId !== reportId;
      });

      return {
        reports: newReports,
        total: reportsLength - 1,
        hasMore,
        firstTime: newReports.length === 0 ? false : firstTime,
      };
    });
  }, []);
  const handleRemovePost = useCallback((postId) => {
    setGroupPosts((prev) => {
      const posts = [...prev.posts];
      const postsLength = prev.total;
      const hasMore = prev.hasMore;
      const firstTime = prev.firstTime;
      const foundPost = posts.find((post) => post.post._idPost === postId);

      let newPosts;
      if (foundPost) {
        newPosts = posts.filter((post) => {
          return post.post._idPost !== postId;
        });
      } else {
        newPosts = posts;
      }
      console.log(newPosts.length);
      return {
        posts: newPosts,
        total: postsLength - 1,
        hasMore,
        firstTime,
      };
    });
  }, []);
  const handleRemoveMemberOrAdmin = useCallback((memberId, memberRole) => {
    if (memberRole === "admin") {
      setGroupAdmins((prev) => {
        const admins = [...prev.admins];
        const adminsLength = prev.total;
        const hasMore = prev.hasMore;
        const firstTime = prev.firstTime;
        const foundAdmin = admins.find((admin) => admin.userId === memberId);

        let newAdmins;
        if (foundAdmin) {
          newAdmins = admins.filter((admin) => {
            return admin.userId !== memberId;
          });
        } else {
          newAdmins = admins;
        }

        return {
          admins: newAdmins,
          total: adminsLength - 1,
          hasMore,
          firstTime,
        };
      });
    } else {
      setGroupMembers((prev) => {
        const members = [...prev.members];
        const membersLength = prev.total;
        const hasMore = prev.hasMore;
        const firstTime = prev.firstTime;
        const foundMember = members.find(
          (member) => member.userId === memberId
        );

        let newMembers;
        if (foundMember) {
          newMembers = members.filter((member) => {
            return member.userId !== memberId;
          });
        } else {
          newMembers = members;
        }

        return {
          members: newMembers,
          total: membersLength - 1,
          hasMore,
          firstTime,
        };
      });
    }
  }, []);
  const handleRemoveAllPostsForMember = (userId) => {
    setGroupPosts((prev) => {
      const posts = prev.posts;
      const totalPostsBeforeDelete = posts.length;

      const newPosts = posts.filter((post) => post.owner.userId !== userId);
      const totalPostsAfterDelete = newPosts.length;

      return {
        posts: newPosts,
        total: totalPostsBeforeDelete - totalPostsAfterDelete,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
      };
    });
  };

  const handleUpgradeMember = (memberId) => {
    var member;
    setGroupMembers((prev) => {
      const members = [...prev.members];
      const total = prev.total;
      member = members.find((member) => {
        return member.userId === memberId;
      });

      const newMembers = members.filter((member) => {
        return member.userId !== memberId;
      });

      return { ...prev, members: newMembers, total: total - 1 };
    });

    setGroupAdmins((prev) => {
      const admins = [...prev.admins];
      const total = prev.total;

      if (admins.length > 0) {
        admins.push(member);
      }

      return { ...prev, total: total + 1, admins };
    });
  };
  const handleDowngradeAdmin = (adminId) => {
    var admin;
    setGroupAdmins((prev) => {
      const admins = [...prev.admins];
      const total = prev.total;
      admin = admins.find((admin) => {
        return admin.userId === adminId;
      });

      const newAdmins = admins.filter((admin) => {
        return admin.userId !== adminId;
      });

      return { ...prev, admins: newAdmins, total: total - 1 };
    });

    setGroupMembers((prev) => {
      const members = [...prev.members];
      const total = prev.total;

      if (members.length > 0) {
        members.push(admin);
      }

      return { ...prev, total: total + 1, members };
    });
  };
  const handleUnblockMember = (memberId) => {
    var blockedMember;
    setGroupBlockedUsers((prev) => {
      const blockedMembers = [...prev.blockedUsers];
      const total = prev.total;
      blockedMember = blockedMembers.find((member) => {
        return member.userId === memberId;
      });

      const newBLockedMembers = blockedMembers.filter((member) => {
        return member.userId !== memberId;
      });

      return { ...prev, blockedUsers: newBLockedMembers, total: total - 1 };
    });

    setGroupMembers((prev) => {
      const members = [...prev.members];
      const total = prev.total;

      if (members.length > 0) {
        members.push(blockedMember);
      }

      return { ...prev, total: total + 1, members };
    });
  };

  const handleAcceptPost = (postId) => {
    var post;
    setGroupPinnedPosts((prev) => {
      post = prev.posts.find((post) => {
        return post.post._idPost === postId;
      });
      const newPosts = prev.posts.filter((post) => {
        return post.post._idPost !== postId;
      });
      return {
        posts: newPosts,
        total: prev.total - 1,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
      };
    });
    //maybe i will edit to add canCommenORLike and more because schema is diffrent
    setGroupPosts((prev) => {
      const posts = [...prev.posts];
      posts.unshift(post);
      return {
        posts: posts,
        total: prev.total + 1,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
      };
    });
  };
  const handleRejectPost = (postId) => {
    var post;
    setGroupPinnedPosts((prev) => {
      post = prev.posts.find((post) => {
        return post.post._idPost === postId;
      });
      const newPosts = prev.posts.filter((post) => {
        return post.post._idPost !== postId;
      });
      return {
        posts: newPosts,
        total: prev.total - 1,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
      };
    });
  };
  const handleAcceptJoiningRequest = (userData) => {
    var request;
    setGroupJoiningRequests((prev) => {
      request = prev.requests.find((request) => {
        return request.userId === userData.userId;
      });

      const newRequests = prev.requests.filter((request) => {
        return request.userId !== userData.userId;
      });

      return {
        requests: newRequests,
        total: prev.total - 1,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
      };
    });

    if (groupMembers.hasMore === false) {
      setGroupMembers((prev) => {
        const members = [...prev.members];

        members.push({
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          logo: userData.logo,
          joiningDate: new Date(),
        });
        return {
          members: members,
          total: prev.total + 1,
          hasMore: prev.hasMore,
          firstTime: prev.firstTime,
        };
      });
    }
  };
  const handleRejectJoiningRequest = (userData) => {
    setGroupJoiningRequests((prev) => {
      const newRequests = prev.requests.filter((request) => {
        return request.userId !== userData.userId;
      });
      return {
        requests: newRequests,
        total: prev.total - 1,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
      };
    });
  };

  const handleChangeSetting = (value, type) => {
    switch (type) {
      case "PRIVACY":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.privacy = value;
          return info;
        });

        break;
      case "VISIBILITY":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.visibility = value;
          return info;
        });
        break;
      case "IMMDIATE_POST":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.immediatePost = value;
          return info;
        });
        break;
      case "WHO_CAN_APPROVE_MEMBER_REQUEST":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.whoCanApproveMemberRequest = value;
          return info;
        });
        break;
      case "WHO_CAN_POST":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.whoCanPost = value;
          return info;
        });
        break;
      case "NAME":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.name = value;
          return info;
        });
        break;
      case "DESCRIPTION":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.description = value;
          return info;
        });
        break;
      case "COVER":
        setGroupInformation((prev) => {
          const info = { ...prev };
          info.cover = value;
          return info;
        });
        break;

      default:
        break;
    }
  };
  const handleAddDescription = (description) => {
    setGroupInformation((prev) => {
      const info = { ...prev };
      info.description = description;
      return info;
    });
  };
  const handleAddCover = (cover) => {
    setGroupInformation((prev) => {
      const info = { ...prev };
      info.cover = cover;
      return info;
    });
  };
  const handleDeletePost = (postId) => {
    if (groupPosts.firstTime) {
      setGroupPosts((prev) => {
        const posts = prev.posts;
        const newPosts = posts.filter((post) => post.post._idPost !== postId);

        return {
          posts: newPosts,
          total: prev.total - 1,
          hasMore: prev.hasMore,
          firstTime: prev.firstTime,
        };
      });
    } else {
      return;
    }
  };
  const handleUpdatePost = (newPost) => {
    if (groupPosts.firstTime) {
      setGroupPosts((prev) => {
        const allPosts = [...prev.posts];
        const post = allPosts.find((p) => {
          return p.post._idPost === newPost._id;
        });
        const oldPost = { ...post };

        oldPost.post.assets = newPost.assets;
        oldPost.post.description = newPost.description;
        if (oldPost.whoCanComment) {
          oldPost.post.whoCanComment = newPost.whoCanComment;
        }
        if (oldPost.whoCanSee) {
          oldPost.post.whoCanSee = newPost.whoCanSee;
        }

        const newPosts = allPosts.filter((p) => {
          return p.post._idPost !== newPost._id;
        });

        newPosts.unshift(oldPost);

        return {
          posts: newPosts,
          total: prev.total,
          firstTime: prev.firstTime,
          hasMore: prev.hasMore,
        };
      });
    } else {
      return;
    }
  };
  const handleCreatePost = (newPost) => {
    if (
      (groupInformation.immediatePost === "anyoneInGroup" ||
        groupInformation.role === "moderator" ||
        groupInformation.role === "admin") &&
      groupPosts.firstTime === true
    ) {
      setGroupPosts((prev) => {
        const posts = [...prev.posts];
        const post = {
          owner: {
            userId: getUserId(),
            firstName: getFullName().split("   ")[0],
            lastName: getFullName().split("   ")[1],
            logo: getLogo(),
          },
          post: {
            _idPost: newPost._id,
            description: newPost.description,
            assets: newPost.assets,
            whoCanSee: newPost.whoCanSee,
            whoCanComment: newPost.whoCanComment,
            numberOfComments: 0,
            numberOfLikes: 0,
            createdAt: newPost.createdAt,
            updatedAt: newPost.updatedAt,
            isHeLikedInPost: false,
            userRole: groupInformation.role,
          },
          group: {
            groupId: groupInformation._id,
            description: groupInformation.description,
            name: groupInformation.name,
            cover: groupInformation.cover,
            yourRoleInGroup: groupInformation.role,
          },
          isHeOwnerOfPost: true,
          canUpdate: true,
          canDelete: true,

          canReport: false,
          canBlock: false,
          canCommentOrLike:
            groupInformation.role === "not member " ? false : true,
        };

        posts.unshift(post);

        return {
          posts,
          total: prev.total + 1,
          hasMore: prev.hasMore,
          firstTime: prev.firstTime,
        };
      });
    } else {
      return;
    }
  };

  const handleResetGroupStates = useCallback(() => {
    setGroupInformation({});
    setGroupPosts({
      posts: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupMembers({
      members: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupAdmins({
      admins: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupModerator({
      moderator: {},
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupReports({
      reports: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupAdminReports({
      reports: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupBlockedUsers({
      blockedUsers: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupPinnedPosts({
      posts: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupYourPinnedPosts({
      posts: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupJoiningRequests({
      requests: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupFriendsNotJoin({
      friends: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
  }, []);

  const ctxValue = {
    groupInformation,
    groupPosts,
    groupMembers,
    groupAdmins,
    groupModerator,
    groupReports,
    groupAdminReports,
    groupBlockedUsers,
    groupPinnedPosts,
    groupYourPinnedPosts,
    groupJoiningRequests,
    groupFriendsNotJoin,
    addGroupInformation: handleAddGroupInformation,
    handleRequestJoin: handleRequestJoin,
    addGroupPosts: handleAddGroupPosts,
    addGroupMembers: handleAddGroupMembers,
    addGroupAdmins: handleAddGroupAdmins,
    addGroupModerator: handleAddGroupModerator,
    addGroupReports: handleAddGroupReports,
    addGroupAdminReports: handleAddGroupAdminReports,
    addGroupPinnedPosts: handleAddGroupPinnedPosts,
    addGroupYourPinnedPosts: handleAddGroupYourPinnedPosts,
    addGroupJoiningRequests: handleAddGroupJoiningRequests,
    addGroupFriendsNotJoined: handleAddGroupFriendsNotJoined,
    removeReport: handleRemoveReport,
    removeAdminReport: handleRemoveAdminReport,
    removePost: handleRemovePost,
    removeMemberOrAdmin: handleRemoveMemberOrAdmin,
    removeAllPostsForMember: handleRemoveAllPostsForMember,
    upgradeMember: handleUpgradeMember,
    downgradeAdmin: handleDowngradeAdmin,
    addGroupBlockedUsers: handleAddGroupBlockedUsers,
    unblockMember: handleUnblockMember,
    acceptPost: handleAcceptPost,
    rejectPost: handleRejectPost,
    rejectJoinRequest: handleRejectJoiningRequest,
    acceptJoinRequest: handleAcceptJoiningRequest,
    changeSetting: handleChangeSetting,
    addDescription_: handleAddDescription,
    addCover_: handleAddCover,
    deletePost__: handleDeletePost,
    updatePost__: handleUpdatePost,
    createPost__: handleCreatePost,
    resetGroupStates: handleResetGroupStates,
  };
  return (
    <GroupContext.Provider value={ctxValue}>{children}</GroupContext.Provider>
  );
}
