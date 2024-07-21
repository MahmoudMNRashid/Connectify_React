/* eslint-disable no-unused-vars */
import { createContext, useCallback, useState } from "react";
import { getFullName, getLogo, getUserId } from "../util/help";
import { content } from "./MainContext";

export const PageContext = createContext({
  pageInformation: {},
  pagePosts: { posts: [], total: 0, hasMore: true, firstTime: false },
  pageFollowers: { followers: [], total: 0, hasMore: true, firstTime: false },
  pageBlockedUsers: {
    blockedUsers: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  pageFriendsNotJoin: {
    friends: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  pageModerator: { moderator: {}, total: 0, hasMore: true, firstTime: false },
  pageRates: {
    rates: [],
    total: 0,
    hasMore: true,
    firstTime: false,
    avgRate: 0,
  },

  addPageInformation: (information) => {},
  addPagePosts: (newPosts) => {},
  addPageFollowers: (followers) => {},
  addPageBlockedUsers: (blockedUsers) => {},
  addPageFriendsNotJoined: (friends) => {},
  addPageModerator: (moderator) => {},
  addPageRates: (rates) => {},

  followPage_: () => {},
  unfollowPage_: () => {},
  blockFollower_: (user) => {},
  unblockUser_: (user) => {},
  changeAbout: (type, desc, data) => {},
  deleteRate_: (ratingId) => {},
  addRate_: (newRate) => {},
  editRate_: (comment, value) => {},
  deletePost___: (postId) => {},
  updatePost___: (newPost) => {},
  createPost___: (newPost) => {},
  add_Edit_Bio: (bio) => {},
  editCategories_: (categories) => {},
  editLogoCover: (assets) => {},
  resetPageStates: () => {},
});

export default function PageContextProvider({ children }) {
  const [pageInformation, setPageInformation] = useState({});

  const [pagePosts, setPagePosts] = useState({
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const [pageFollowers, setPageFollowers] = useState({
    followers: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const [pageBlockedUsers, setPageBlockedUsers] = useState({
    blockedUsers: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const [pageFriendsNotJoin, setPageFriendsNotJoin] = useState({
    friends: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const [pageModerator, setPageModerator] = useState({
    moderator: {},
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [pageRates, setPageRates] = useState({
    rates: [],
    total: 0,
    hasMore: true,
    firstTime: false,
    avgRate: 0,
  });

  const handleAddPageInformation = useCallback((information) => {
    setPageInformation(information);
  }, []);

  const handleAddPagePosts = useCallback(
    (newPosts, total, hasMore, firstTime) => {
      setPagePosts((prev) => {
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

  const handleAddPageFollowers = useCallback(
    (newFollowers, total, hasMore, firstTime) => {
      setPageFollowers((prev) => {
        return {
          followers: [...prev.followers, ...newFollowers],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );

  const handleAddPageBlockedUsers = useCallback(
    (newBlockedUsers, total, hasMore, firstTime) => {
      setPageBlockedUsers((prev) => {
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

  const handleAddPageFriendsNotJoined = useCallback(
    (newFriends, total, hasMore, firstTime) => {
      setPageFriendsNotJoin((prev) => {
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
  const handleAddPageModerator = useCallback(
    (newModerator, total, hasMore, firstTime) => {
      setPageModerator((prev) => {
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

  const handleAddRates = useCallback((newRates, total, hasMore, firstTime) => {
    setPageRates((prev) => {
      return {
        rates: [...prev.rates, ...newRates.rates],
        total,
        hasMore,
        firstTime,
        avgRate: newRates.avgRate,
      };
    });
  }, []);

  const handleFollowPage = () => {
    setPageInformation((prev) => {
      const data = { ...prev };
      data.isHeFollowers = true;
      return data;
    });

    //For Followers State
    let firstTime = pageFollowers.firstTime;
    let hasMore = pageFollowers.hasMore;
    let length = pageFollowers.followers.length;

    if (firstTime && !hasMore) {
      setPageFollowers((prev) => {
        const data = { ...prev };

        data.followers.push({
          userId: getUserId(),
          firstName: getFullName().split("   ")[0],
          lastName: getFullName().split("   ")[1],
          logo: getLogo(),
        });

        return {
          followers: data.followers,
          firstTime: firstTime,
          hasMore: hasMore,
          total: length + 1,
        };
      });
    }
  };

  const handleunFollowPage = () => {
    setPageInformation((prev) => {
      const data = { ...prev };
      data.isHeFollowers = false;
      return data;
    });

    //For Followers State
    let firstTime = pageFollowers.firstTime;
    let hasMore = pageFollowers.hasMore;
    let length = pageFollowers.followers.length;

    if (firstTime) {
      const isUserFoundInFollowersArray = pageFollowers.followers.find(
        (follower) => {
          return follower.userId === getUserId();
        }
      );

      if (isUserFoundInFollowersArray) {
        if (length === 1) {
          setPageFollowers((prev) => {
            const data = { ...prev };
            const newFollowers = pageFollowers.followers.filter((follower) => {
              return follower.userId !== getUserId();
            });

            return {
              followers: newFollowers,
              firstTime: false,
              hasMore: true,
              total: 0,
            };
          });
        } else {
          setPageFollowers((prev) => {
            const data = { ...prev };
            const newFollowers = pageFollowers.followers.filter((follower) => {
              return follower.userId !== getUserId();
            });

            return {
              followers: newFollowers,
              firstTime: firstTime,
              hasMore: hasMore,
              total: length - 1,
            };
          });
        }
      }
    }
  };

  const handleBlockFollower = (user) => {
    setPageFollowers((prev) => {
      const data = { ...prev };
      const newFollowers = pageFollowers.followers.filter((follower) => {
        return follower.userId !== user.userId;
      });

      return {
        followers: newFollowers,
        firstTime: data.firstTime,
        hasMore: data.hasMore,
        total: data.total - 1,
      };
    });

    //For Blocked users State
    let firstTime = pageBlockedUsers.firstTime;
    let hasMore = pageBlockedUsers.hasMore;
    let length = pageBlockedUsers.total;

    if (firstTime && !hasMore) {
      setPageBlockedUsers((prev) => {
        const data = { ...prev };

        data.blockedUsers.push({ ...user, data: new Date() });

        return {
          blockedUsers: data.blockedUsers,
          firstTime: firstTime,
          hasMore: hasMore,
          total: length + 1,
        };
      });
    }
  };

  const handleUnblockUser = (user) => {
    setPageBlockedUsers((prev) => {
      const data = { ...prev };
      const newBLockedUsers = data.blockedUsers.filter((user) => {
        return user.userId !== user.userId;
      });

      return {
        blockedUsers: newBLockedUsers,
        firstTime: data.firstTime,
        hasMore: data.hasMore,
        total: data.total - 1,
      };
    });
  };

  const handleAbout = (type, desc, data) => {
    if (type === "UPDATE")
      switch (desc) {
        case "Gender":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.gender = data.gender;
            return newInfo;
          });
          break;
        case "Date of birth":
          setPageInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.birthDay = data.birthday;
            return newInfo;
          });
          break;
        case "Phone":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.phoneNumber = data.phoneNumber;
            return newInfo;
          });
          break;
        case "Email":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.email = data.email;
            return newInfo;
          });
          break;
        case "City":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.currentCity = data.name;
            return newInfo;
          });
          break;
        case "Home town":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.homeTown = data.name;
            return newInfo;
          });
          break;
        case "University":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            const formatData = {
              name: data.collegeName,
              graduated: data.graduated,
              _id: data._idCollege,
            };
            newInfo.education.college[0] = formatData;
            return newInfo;
          });
          break;
        case "School":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            const formatData = {
              name: data.highSchoolName,
              year: data.year,
              _id: data._idHighSchool,
            };
            newInfo.education.highSchool[0] = formatData;
            return newInfo;
          });
          break;

        default:
          break;
      }
    else if (type === "ADD") {
      switch (desc) {
        case "Gender":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.gender = data.gender;
            return newInfo;
          });
          break;
        case "Date of birth":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.birthDay = data.birthday;
            return newInfo;
          });
          break;
        case "Phone":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.phoneNumber = data.phoneNumber;
            return newInfo;
          });
          break;
        case "Email":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.email = data.email;
            return newInfo;
          });
          break;
        case "City":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.currentCity = data.name;
            return newInfo;
          });
          break;
        case "Home town":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.homeTown = data.name;
            return newInfo;
          });
          break;
        case "University":
          setPageInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.education.college[0] = data;
            return newInfo;
          });
          break;
        case "School":
          setPageInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.education.highSchool[0] = data;
            return newInfo;
          });
          break;

        default:
          break;
      }
    } else if (type === "DELETE") {
      switch (desc) {
        case "Gender":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.gender = undefined;
            return newInfo;
          });
          break;
        case "Date of birth":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.birthDay = undefined;
            return newInfo;
          });
          break;
        case "Phone":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.phoneNumber = undefined;
            return newInfo;
          });
          break;
        case "Email":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.email = undefined;
            return newInfo;
          });
          break;
        case "City":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.currentCity = undefined;
            return newInfo;
          });
          break;
        case "Home town":
          setPageInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.homeTown = undefined;
            return newInfo;
          });
          break;
        case "University":
          setPageInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.education.college = [];
            return newInfo;
          });
          break;
        case "School":
          setPageInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.education.highSchool = [];
            return newInfo;
          });
          break;

        default:
          break;
      }
    }
  };

  const handleDeleteRate = (ratingId, value) => {
    setPageRates((prev) => {
      const rates = [...prev.rates];
      const newRates = rates.filter((rate) => {
        return rate.infoRate.ratingId !== ratingId;
      });

      const newSum = +prev.avgRate * +prev.total - +value;
      const newTotal = +prev.total - 1;

      const newAvg = newTotal > 0 ? newSum / newTotal : 0;
      return {
        rates: newRates,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
        total: prev.total - 1,
        avgRate: newAvg,
      };
    });
  };
  const handleAddRate = (newRate) => {
    setPageRates((prev) => {
      const rates = [...prev.rates];
      const rate = {
        from: {
          userId: newRate.by,
          firstName: getFullName().split("   ")[0],
          lastName: getFullName().split("   ")[1],
          logo: getLogo(),
        },
        infoRate: {
          value: newRate.value,
          comment: newRate.comment,
          ratingDate: newRate.ratingDate,
          ratingId: newRate._id,
        },
        canUpdate: true,
        canDelete: true,
      };

      const newRates = [rate, ...rates];

      const newSum = +prev.avgRate * +prev.total + +newRate.value;
      const newTotal = +prev.total + 1;

      const newAvg = newSum / newTotal;

      return {
        rates: newRates,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
        total: prev.total + 1,
        avgRate: newAvg,
      };
    });
  };
  const handleEditRate = (comment, value) => {
    setPageRates((prev) => {
      const rates = [...prev.rates];
      const rate = rates.find((rate) => {
        return rate.from.userId === getUserId();
      });

      const deletedAvg =
        +prev.avgRate * +prev.total - +rate.infoRate.value + +value;

      const editedAvg = deletedAvg / prev.total;
      rate.infoRate.value = value;
      rate.infoRate.comment = comment;
      return {
        rates: rates,
        hasMore: prev.hasMore,
        firstTime: prev.firstTime,
        total: prev.total + 1,
        avgRate: editedAvg,
      };
    });
  };
  const handleDeletePost = (postId) => {
    if (pagePosts.firstTime) {
      setPagePosts((prev) => {
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
    if (pagePosts.firstTime === true) {
      setPagePosts((prev) => {
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
    if (pagePosts.firstTime === true) {
      setPagePosts((prev) => {
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
            canCommentOrLike: true,
          },

          isHeOwnerOfPost: true,
          canUpdate: true,
          canDelete: true,
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

  const handleAdd_Edit_Bio = (bio) => {
    setPageInformation((prev) => {
      const info = { ...prev };
      info.bio = bio;
      return info;
    });
  };
  const handleEditCategories = (categories) => {
    setPageInformation((prev) => {
      const info = { ...prev };
      info.categories = categories;
      return info;
    });
  };
  const handleAdd_EDIT_Logo_Cover = (assets, type) => {
    setPageInformation((prev) => {
      const info = { ...prev };
      if (type === content.ADD_LOGO_PAGE || type === content.EDIT_LOGO_PAGE) {
        info.logo = assets;
        return info;
      } else {
        info.cover = assets;
        return info;
      }
    });
  };

  const handleResetPageStates = useCallback(() => {
    setPageInformation({});
    setPagePosts({
      posts: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPageFollowers({
      followers: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPageBlockedUsers({
      blockedUsers: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPageFriendsNotJoin({
      friends: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPageModerator({
      moderator: {},
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPageRates({
      rates: [],
      total: 0,
      hasMore: true,
      firstTime: false,
      avgRate: 0,
    });
  }, []);

  const ctxValue = {
    pageInformation,
    pagePosts,
    pageFollowers,
    pageBlockedUsers,
    pageFriendsNotJoin,
    pageModerator,
    pageRates,
    addPageFriendsNotJoined: handleAddPageFriendsNotJoined,
    addPageInformation: handleAddPageInformation,
    addPageFollowers: handleAddPageFollowers,
    addPageBlockedUsers: handleAddPageBlockedUsers,
    addPageModerator: handleAddPageModerator,
    addPageRates: handleAddRates,
    followPage_: handleFollowPage,
    unfollowPage_: handleunFollowPage,
    addPagePosts: handleAddPagePosts,
    blockFollower_: handleBlockFollower,
    unblockUser_: handleUnblockUser,
    changeAbout: handleAbout,
    deleteRate_: handleDeleteRate,
    addRate_: handleAddRate,
    editRate_: handleEditRate,
    deletePost___: handleDeletePost,
    updatePost___: handleUpdatePost,
    createPost___: handleCreatePost,
    add_Edit_Bio: handleAdd_Edit_Bio,
    editCategories_: handleEditCategories,
    editLogoCover: handleAdd_EDIT_Logo_Cover,
    resetPageStates: handleResetPageStates,
  };
  return (
    <PageContext.Provider value={ctxValue}>{children}</PageContext.Provider>
  );
}
