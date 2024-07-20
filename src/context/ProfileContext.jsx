import { createContext, useCallback, useState } from "react";
import { getFullName, getLogo, getUserId } from "../util/help";
import Cookies from "js-cookie";

export const ProfileContext = createContext({
  selectedTap: "",
  selectTap: () => {},
  mainInformation: {},
  friends: { friends: [], total: 0, hasMore: true, firstTime: false },
  addFriends: () => {},
  addMainInformation: () => {},
  editName: () => {},
  editBio: () => {},
  editFriendType: () => {},
  editBackgroundImage: () => {},
  deleteBackgroundImage: () => {},
  changeAbout: () => {},
  groupInvites: { invites: [], total: 0, hasMore: true, firstTime: false },
  AddGroupInvites: () => {},
  DeleteGroupInvite: () => {},
  pageInvites: { invites: [], total: 0, hasMore: true, firstTime: false },
  AddPageInvites: () => {},
  DeletePageInvite: () => {},
  AcceptPageInvite: () => {},
  joinedPages: { pages: [], total: 0, hasMore: true, firstTime: false },
  addJoinedPages: () => {},
  setJoinedPages: () => {},
  ownedPages: { pages: [], total: 0, hasMore: true, firstTime: false },
  addOwnedPages: () => {},
  setOwnedPages: () => {},
  joinedGroups: { groups: [], total: 0, hasMore: true, firstTime: false },
  addJoinedGroups: () => {},
  setJoinedGroups: () => {},
  friendsRequestSend: {
    requests: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  addFriendsRequestSend: () => {},
  setFriendsRequestSend: () => {},
  RemoveRequestFromFriendsRequestSend: () => {},
  friendsRequestRecieve: {
    requests: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  },
  addFriendsRequestRecieve: () => {},
  setFriendsRequestRecieve: () => {},
  RemoveRequestFromFriendsRequestRecieve: () => {},
  posts: { posts: [], total: 0, hasMore: true, firstTime: false },
  addPosts: () => {},
  deletePost____: () => {},
  updatePost____: () => {},
  createPost____: () => {},
  addNewPhoto: () => {},
  deleteCurrentPhotoOrPrevious: () => {},
  setPreviousPhotoAsCurrentProfilePhoto_: () => {},
  resetAllStates: () => {},
});

export default function ProfileContextProvider({ children }) {
  const [selectedTap, setSelectedTap] = useState("");
  const [mainInformation, setMainInformation] = useState({});
  const [friends, setFriends] = useState({
    friends: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [joinedPages, setJoinedPages] = useState({
    pages: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [joinedGroups, setJoinedGroups] = useState({
    groups: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupInvites, setGroupInvites] = useState({
    invites: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [pageInvites, setPageInvites] = useState({
    invites: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [ownedPages, setOwnedPages] = useState({
    pages: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [friendsRequestSend, setFriendsRequestSend] = useState({
    requests: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [friendsRequestRecieve, setFriendsRequestRecieve] = useState({
    requests: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const [posts, setPosts] = useState({
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const handleSelect = (selectedTap) => {
    setSelectedTap(selectedTap);
  };

  const handleAddPosts = useCallback((newPosts, total, hasMore, firstTime) => {
    setPosts((prev) => {
      return {
        posts: [...prev.posts, ...newPosts],
        total,
        hasMore,
        firstTime,
      };
    });
  }, []);

  const handleAddMainInformation = useCallback((data) => {
    setMainInformation(data);
  }, []);
  const handleAddFriends = useCallback(
    (newFriends, total, hasMore, firstTime) => {
      setFriends((prev) => {
        const newPages = {
          friends: [...prev.friends, ...newFriends],
          total: total,
          hasMore,
          firstTime,
        };

        return newPages;
      });
    },
    []
  );

  const handleEditName = (newFirstName, newLastName) => {
    setMainInformation((prev) => {
      const oldInfo = { ...prev };
      oldInfo.firstName = newFirstName;
      oldInfo.lastName = newLastName;
      oldInfo.canHeChangeName = false;
      return oldInfo;
    });
  };

  const handleEditBio = (bio) => {
    setMainInformation((prev) => {
      const oldInfo = { ...prev };
      oldInfo.bio = bio;

      return oldInfo;
    });
  };
  const handleEditFriendTypes = (type) => {
    switch (type) {
      case "areYouSendFriendRequestToHim-false":
        setMainInformation((prev) => {
          const oldInfo = { ...prev };
          oldInfo.areYouSendFriendRequestToHim = false;

          return oldInfo;
        });
        break;
      case "areYouSendFriendRequestToHim-true":
        setMainInformation((prev) => {
          const oldInfo = { ...prev };
          oldInfo.areYouSendFriendRequestToHim = true;

          return oldInfo;
        });
        break;
      case "isHeFriend-false":
        setMainInformation((prev) => {
          const oldInfo = { ...prev };
          oldInfo.isHeFriend = false;

          return oldInfo;
        });
        break;
      case "isHeFriend-true":
        setMainInformation((prev) => {
          const oldInfo = { ...prev };
          oldInfo.isHeFriend = true;

          return oldInfo;
        });
        break;
      case "isHeSendFriendRequestToYou-false":
        setMainInformation((prev) => {
          const oldInfo = { ...prev };
          oldInfo.isHeSendFriendRequestToYou = false;

          return oldInfo;
        });
        break;
      default:
      // code block
    }
  };

  const handleEditBackgroundImage = (asset) => {
    setMainInformation((prev) => {
      const oldInfo = { ...prev };
      oldInfo.backgroundPhotos = asset;

      return oldInfo;
    });
  };

  const handleDeleteBackgroundImage = () => {
    setMainInformation((prev) => {
      const oldInfo = { ...prev };
      oldInfo.backgroundPhotos = [];

      return oldInfo;
    });
  };

  const handleAbout = (type, desc, data) => {
    if (type === "UPDATE")
      switch (desc) {
        case "Gender":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.gender = data.gender;
            return newInfo;
          });
          break;
        case "Date of birth":
          setMainInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.birthDay = data.birthday;
            return newInfo;
          });
          break;
        case "Phone":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.phoneNumber = data.phoneNumber;
            return newInfo;
          });
          break;
        case "City":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.currentCity = data.name;
            return newInfo;
          });
          break;
        case "Home town":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.homeTown = data.name;
            return newInfo;
          });
          break;
        case "University":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            const formatData = {
              name: data.nameofCollege,
              graduated: data.graduated,
              _id: data.id,
            };
            newInfo.education.college[0] = formatData;
            return newInfo;
          });
          break;
        case "School":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            const formatData = {
              name: data.nameofHighSchool,
              year: data.year,
              _id: data.id,
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
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.gender = data.gender;
            return newInfo;
          });
          break;
        case "Date of birth":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.birthDay = data.birthday;
            return newInfo;
          });
          break;
        case "Phone":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.phoneNumber = data.phoneNumber;
            return newInfo;
          });
          break;
        case "City":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.currentCity = data.name;
            return newInfo;
          });
          break;
        case "Home town":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.homeTown = data.name;
            return newInfo;
          });
          break;
        case "University":
          setMainInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.education.college[0] = data;
            return newInfo;
          });
          break;
        case "School":
          setMainInformation((prev) => {
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
        case "Phone":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.phoneNumber = undefined;
            return newInfo;
          });
          break;
        case "City":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.currentCity = undefined;
            return newInfo;
          });
          break;
        case "Home town":
          setMainInformation((prev) => {
            const newInfo = { ...prev };
            newInfo.placesLived.homeTown = undefined;
            return newInfo;
          });
          break;
        case "University":
          setMainInformation((prev) => {
            const newInfo = { ...prev };

            newInfo.education.college = [];
            return newInfo;
          });
          break;
        case "School":
          setMainInformation((prev) => {
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
  const handleAddGroupInvites = useCallback(
    (newInvite, total, hasMore, firstTime) => {
      setGroupInvites((prev) => {
        const newInvites = {
          invites: [...prev.invites, ...newInvite],
          total: total,
          hasMore,
          firstTime,
        };

        return newInvites;
      });
    },
    []
  );
  const handleAddPageInvites = useCallback(
    (newInvite, total, hasMore, firstTime) => {
      setPageInvites((prev) => {
        const newInvites = {
          invites: [...prev.invites, ...newInvite],
          total: total,
          hasMore,
          firstTime,
        };

        return newInvites;
      });
    },
    []
  );

  const handleDeletePageInvite = useCallback((idInvite) => {
    setPageInvites((prev) => {
      const oldInvites = { ...prev };
      const invitesWithoutDeletedInvite = oldInvites.invites.filter(
        (invite) => {
          invite.idInvite !== idInvite;
        }
      );

      const newInvites = {
        invites: invitesWithoutDeletedInvite,
        total: oldInvites.total - 1,
      };

      return newInvites;
    });

    setMainInformation((prev) => {
      const oldMainInfo = { ...prev };

      oldMainInfo.pageInvites -= 1;
      return oldMainInfo;
    });
  }, []);
  const handleAcceptPageInvite = useCallback(
    (page) => {
      var filteredCount;
      setPageInvites((prev) => {
        const oldInvites = { ...prev };
        const invitesWithoutDeletedInvite = oldInvites.invites.filter(
          (invite) => {
            invite.page.pageId !== page.pageId;
          }
        );
        filteredCount =
          oldInvites.invites.length - invitesWithoutDeletedInvite.length;
        const newInvites = {
          invites: invitesWithoutDeletedInvite,
          total: filteredCount,
        };

        return newInvites;
      });
      setMainInformation((prev) => {
        const oldMainInfo = { ...prev };

        oldMainInfo.pageInvites -= filteredCount;
        return oldMainInfo;
      });

      if (!joinedPages.hasMore) {
        setJoinedPages((prev) => {
          const newPages = [...prev.pages];
          newPages.push(page);
          return {
            pages: newPages,
            total: prev.total + 1,
            hasMore: prev.hasMore,
            firstTime: prev.firstTime,
          };
        });
      }
    },
    [joinedPages]
  );

  const handleDeleteGroupInvite = useCallback((idInvite) => {
    setGroupInvites((prev) => {
      const oldInvites = { ...prev };
      const invitesWithoutDeletedInvite = oldInvites.invites.filter(
        (invite) => {
          invite.idInvite !== idInvite;
        }
      );

      const newInvites = {
        invites: invitesWithoutDeletedInvite,
        total: oldInvites.total - 1,
      };

      return newInvites;
    });
    setMainInformation((prev) => {
      const oldMainInfo = { ...prev };

      oldMainInfo.groupInvites -= 1;
      return oldMainInfo;
    });
  }, []);

  const handleAddJoinedPages = useCallback(
    (newPage, total, hasMore, firstTime) => {
      setJoinedPages((prev) => {
        const newPages = {
          pages: [...prev.pages, ...newPage],
          total,
          hasMore,
          firstTime,
        };

        return newPages;
      });
    },
    []
  );
  const setJoinedPagesDirectly = useCallback((pages) => {
    setJoinedPages(pages);
  }, []);

  const handleAddOwnedPages = useCallback(
    (newPage, total, hasMore, firstTime) => {
      setOwnedPages((prev) => {
        const newPages = {
          pages: [...prev.pages, ...newPage],
          total: total,
          hasMore,
          firstTime,
        };

        return newPages;
      });
    },
    []
  );
  const setOwnedPagesDirectly = useCallback((pages) => {
    setOwnedPages(pages);
  }, []);

  const handleAddJoinedGroups = useCallback(
    (newGroup, total, hasMore, firstTime) => {
      setJoinedGroups((prev) => {
        const newGroups = {
          groups: [...prev.groups, ...newGroup],
          total,

          hasMore,
          firstTime,
        };

        return newGroups;
      });
    },
    []
  );
  const setJoinedGroupsDirectly = useCallback((groups) => {
    setJoinedPages(groups);
  }, []);

  const handleAddFriendsRequestSend = useCallback(
    (newRequests, total, hasMore, firstTime) => {
      setFriendsRequestSend((prev) => {
        const requests = {
          requests: [...prev.requests, ...newRequests],
          total: total,
          hasMore,
          firstTime,
        };

        return requests;
      });
    },
    []
  );
  const setFriendsRequestSendDirectly = useCallback((requests) => {
    setFriendsRequestSend(requests);
  }, []);

  const handleRemoveRequestFromFriendsRequestSend = (userId) => {
    setFriendsRequestSend((prev) => {
      const newRequests = prev.requests.filter(
        (request) => request.userId !== userId
      );

      return { requests: newRequests, total: prev.total - 1 };
    });
  };
  const handleAddFriendsRequestRecieve = useCallback(
    (newRequests, total, hasMore, firstTime) => {
      setFriendsRequestRecieve((prev) => {
        const Requests = {
          requests: [...prev.requests, ...newRequests],
          total: total,
          hasMore,
          firstTime,
        };

        return Requests;
      });
    },
    []
  );
  const setFriendsRequestRecieveDirectly = useCallback((requests) => {
    setFriendsRequestRecieve(requests);
  }, []);

  const handleRemoveRequestFromFriendsRequestRecieve = (user, accept) => {
    setFriendsRequestRecieve((prev) => {
      const newRequests = prev.requests.filter(
        (request) => request.userId !== user.userId
      );

      return { requests: newRequests, total: prev.total - 1 };
    });
    setMainInformation((prev) => {
      const oldMainInfo = { ...prev };

      oldMainInfo.incomingRequest -= 1;
      return oldMainInfo;
    });
    if (accept && !friends.hasMore) {
      setFriends((prev) => {
        const newFriends = [...prev.friends];
        newFriends.push(user);
        return {
          friends: newFriends,
          total: prev.total + 1,
          hasMore: prev.hasMore,
          firstTime: prev.firstTime,
        };
      });
    }
    if (accept) {
      setMainInformation((prev) => {
        const oldMainInfo = { ...prev };

        oldMainInfo.friends += 1;
        return oldMainInfo;
      });
    }
  };
  const handleDeletePost = (postId) => {
    if (posts.firstTime) {
      setPosts((prev) => {
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
    if (posts.firstTime) {
      setPosts((prev) => {
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
    if (posts.firstTime === true) {
      setPosts((prev) => {
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

  const handleAddNewPhotoAndSet = (asset) => {
    setMainInformation((prev) => {
      const info = { ...prev };
      info.profilePhotos.push({ asset, date: new Date() });
      return info;
    });

    const cookieName = "Jto__Uid";
    const cookieValue = Cookies.get(cookieName);
    const parts = cookieValue.split("__&");
    parts[4] = asset.public_id;
    parts[5] = asset.link;
    const newCookieValue = parts.join("__&");
    Cookies.set(cookieName, newCookieValue);
  };
  const handleDeleteCurrentPhotoOrPrevious = (publicId) => {
    setMainInformation((prev) => {
      const info = { ...prev };
      const newProfilePhoto = info.profilePhotos.filter((asset) => {
        return asset.asset.public_id !== publicId;
      });
      info.profilePhotos = [...newProfilePhoto];
      return info;
    });
  };
  const handleSetPreviousPhotoAsCurrentProfilePhoto = (publicId) => {
    setMainInformation((prev) => {
      const info = { ...prev };
      const previousPhoto = info.profilePhotos.find((asset) => {
        return asset.asset.public_id === publicId;
      });

      previousPhoto.date = new Date();
      const newPhotos = info.profilePhotos.filter((asset) => {
        return asset.asset.public_id !== publicId;
      });

      const cookieName = "Jto__Uid";
      const cookieValue = Cookies.get(cookieName);
      const parts = cookieValue.split("__&");
      parts[4] = previousPhoto.asset.public_id;
      parts[5] = previousPhoto.asset.link;
      const newCookieValue = parts.join("__&");
      Cookies.set(cookieName, newCookieValue);

      newPhotos.push(previousPhoto);

      info.profilePhotos = [...newPhotos];
      return info;
    });
  };

  const handleResetAllStates = useCallback(() => {
    setSelectedTap("");
    setMainInformation({});
    setFriends({
      friends: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setJoinedPages({
      pages: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setJoinedGroups({
      groups: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setGroupInvites({
      invites: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPageInvites({
      invites: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setOwnedPages({
      pages: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setFriendsRequestSend({
      requests: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setFriendsRequestRecieve({
      requests: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
    setPosts({
      posts: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
  }, []);

  const ctxValue = {
    selectedTap,
    selectTap: handleSelect,
    mainInformation,
    addMainInformation: handleAddMainInformation,
    editName: handleEditName,
    editBio: handleEditBio,
    editFriendType: handleEditFriendTypes,
    editBackgroundImage: handleEditBackgroundImage,
    deleteBackgroundImage: handleDeleteBackgroundImage,
    friends,
    addFriends: handleAddFriends,
    changeAbout: handleAbout,
    AddGroupInvites: handleAddGroupInvites,
    groupInvites,
    DeleteGroupInvite: handleDeleteGroupInvite,
    AddPageInvites: handleAddPageInvites,
    pageInvites,
    DeletePageInvite: handleDeletePageInvite,
    AcceptPageInvite: handleAcceptPageInvite,
    joinedPages,
    addJoinedPages: handleAddJoinedPages,
    setJoinedPages: setJoinedPagesDirectly,
    ownedPages,
    addOwnedPages: handleAddOwnedPages,
    setOwnedPages: setOwnedPagesDirectly,
    joinedGroups,
    addJoinedGroups: handleAddJoinedGroups,
    setJoinedGroups: setJoinedGroupsDirectly,
    friendsRequestSend,
    addFriendsRequestSend: handleAddFriendsRequestSend,
    setFriendsRequestSend: setFriendsRequestSendDirectly,
    RemoveRequestFromFriendsRequestSend:
      handleRemoveRequestFromFriendsRequestSend,
    friendsRequestRecieve,
    addFriendsRequestRecieve: handleAddFriendsRequestRecieve,
    setFriendsRequestRecieve: setFriendsRequestRecieveDirectly,
    RemoveRequestFromFriendsRequestRecieve:
      handleRemoveRequestFromFriendsRequestRecieve,
    posts,
    addPosts: handleAddPosts,
    deletePost____: handleDeletePost,
    updatePost____: handleUpdatePost,
    createPost____: handleCreatePost,
    addNewPhoto: handleAddNewPhotoAndSet,
    deleteCurrentPhotoOrPrevious: handleDeleteCurrentPhotoOrPrevious,
    setPreviousPhotoAsCurrentProfilePhoto_:
      handleSetPreviousPhotoAsCurrentProfilePhoto,
    resetAllStates: handleResetAllStates,
  };
  return (
    <ProfileContext.Provider value={ctxValue}>
      {children}
    </ProfileContext.Provider>
  );
}
