import { createContext, useCallback, useState } from "react";

export const ProfileContext = createContext({
  selectedTap: "",
  selectTap: () => {},
  mainInformation: {},
  friends: [],
  addFriends: () => {},
  addMainInformation: () => {},
  editName: () => {},
  editBio: () => {},
  editFriendType: () => {},
  editBackgroundImage: () => {},
  deleteBackgroundImage: () => {},
  changeAbout: () => {},
  groupInvites: { invites: [], total: 0 },
  AddGroupInvites: () => {},
  DeleteGroupInvite: () => {},
  pageInvites: { invites: [], total: 0 },
  AddPageInvites: () => {},
  DeletePageInvite: () => {},
  AcceptPageInvite: () => {},
  joinedPages: { pages: [], total: 0 },
  addJoinedPages: () => {},
  setJoinedPages: () => {},
  ownedPages: { pages: [], total: 0 },
  addOwnedPages: () => {},
  setOwnedPages: () => {},
  joinedGroups: { groups: [], total: 0 },
  addJoinedGroups: () => {},
  setJoinedGroups: () => {},
  friendsRequestSend: { requests: [], total: 0 },
  addFriendsRequestSend: () => {},
  setFriendsRequestSend: () => {},
  RemoveRequestFromFriendsRequestSend: () => {},
  friendsRequestRecieve: { requests: [], total: 0 },
  addFriendsRequestRecieve: () => {},
  setFriendsRequestRecieve: () => {},
  RemoveRequestFromFriendsRequestRecieve: () => {},
});

export default function ProfileContextProvider({ children }) {
  const [selectedTap, setSelectedTap] = useState("");
  const [mainInformation, setMainInformation] = useState({});
  const [friends, setFriends] = useState({});
  const [joinedPages, setJoinedPages] = useState({ pages: [], total: 0 });
  const [ownedPages, setOwnedPages] = useState({ pages: [], total: 0 });
  const [joinedGroups, setJoinedGroups] = useState({ group: [], total: 0 });
  const [groupInvites, setGroupInvites] = useState({ invites: [], total: 0 });
  const [pageInvites, setPageInvites] = useState({ invites: [], total: 0 });
  const [friendsRequestSend, setFriendsRequestSend] = useState({
    requests: [],
    total: 0,
  });
  const [friendsRequestRecieve, setFriendsRequestRecieve] = useState({
    requests: [],
    total: 0,
  });
  const handleSelect = (selectedTap) => {
    setSelectedTap(selectedTap);
  };

  const handleAddMainInformation = useCallback((data) => {
    setMainInformation(data);
  }, []);
  const handleAddFriends = useCallback((data) => {
    setFriends(data);
  }, []);

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
            console.log(data);
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
  const handleAddGroupInvites = useCallback((newInvite, total) => {
    setGroupInvites((prev) => {
      const oldInvites = { ...prev };
      console.log(newInvite, total);
      console.log(oldInvites);
      const newInvites = {
        invites: [...oldInvites.invites, ...newInvite],
        total: total,
      };
      console.log(newInvite);
      return newInvites;
    });
  }, []);
  const handleAddPageInvites = useCallback((newInvite, total) => {
    setPageInvites((prev) => {
      const oldInvites = { ...prev };
      console.log(newInvite, total);
      console.log(oldInvites);
      const newInvites = {
        invites: [...oldInvites.invites, ...newInvite],
        total: total,
      };
      console.log(newInvite);
      return newInvites;
    });
  }, []);

  const handleDeletePageInvite = useCallback((idInvite) => {
    setPageInvites((prev) => {
      const oldInvites = { ...prev };
      const invitesWithoutDeletedInvite = oldInvites.invites.filter(
        (invite) => {
          invite.idInvite !== idInvite;
        }
      );
      console.log(invitesWithoutDeletedInvite);
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
  const handleAcceptPageInvite = useCallback((idPage) => {
    var filteredCount;
    setPageInvites((prev) => {
      const oldInvites = { ...prev };
      const invitesWithoutDeletedInvite = oldInvites.invites.filter(
        (invite) => {
          invite.page.pageId !== idPage;
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
  }, []);
  const handleDeleteGroupInvite = useCallback((idInvite) => {
    setGroupInvites((prev) => {
      const oldInvites = { ...prev };
      const invitesWithoutDeletedInvite = oldInvites.invites.filter(
        (invite) => {
          invite.idInvite !== idInvite;
        }
      );
      console.log(invitesWithoutDeletedInvite);
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

  const handleAddJoinedPages = useCallback((newPage, total) => {
    setJoinedPages((prev) => {
      const oldPages = { ...prev };

      const newPages = {
        pages: [...oldPages.pages, ...newPage],
        total: total,
      };

      return newPages;
    });
  }, []);
  const setJoinedPagesDirectly = useCallback((pages) => {
    setJoinedPages(pages);
  }, []);
  const handleAddOwnedPages = useCallback((newPage, total) => {
    setOwnedPages((prev) => {
      const oldPages = { ...prev };

      const newPages = {
        pages: [...oldPages.pages, ...newPage],
        total: total,
      };

      return newPages;
    });
  }, []);
  const setOwnedPagesDirectly = useCallback((pages) => {
    setOwnedPages(pages);
  }, []);

  const handleAddJoinedGroups = useCallback((newGroup, total) => {
    setJoinedGroups((prev) => {
      const oldGroups = { ...prev };

      const newGroups = {
        groups: [...oldGroups.group, ...newGroup],
        total: total,
      };

      return newGroups;
    });
  }, []);
  const setJoinedGroupsDirectly = useCallback((groups) => {
    setJoinedPages(groups);
  }, []);
  const handleAddFriendsRequestSend = useCallback((newRequests, total) => {
    setFriendsRequestSend((prev) => {
      const oldRequests = { ...prev };

      const Requests = {
        requests: [...oldRequests.requests, ...newRequests],
        total: total,
      };

      return Requests;
    });
  }, []);
  const setFriendsRequestSendDirectly = useCallback((requests) => {
    setFriendsRequestSend(requests);
  }, []);

  const handleRemoveRequestFromFriendsRequestSend = (userId) => {
    setFriendsRequestSend((prev) => {
      console.log("prev", prev.requests);
      const newRequests = prev.requests.filter(
        (request) => request.userId !== userId
      );

      console.log("now", newRequests);
      return { requests: newRequests, total: prev.total - 1 };
    });
  };
  const handleAddFriendsRequestRecieve = useCallback((newRequests, total) => {
    setFriendsRequestRecieve((prev) => {
      const oldRequests = { ...prev };

      const Requests = {
        requests: [...oldRequests.requests, ...newRequests],
        total: total,
      };

      return Requests;
    });
  }, []);
  const setFriendsRequestRecieveDirectly = useCallback((requests) => {
    setFriendsRequestRecieve(requests);
  }, []);

  const handleRemoveRequestFromFriendsRequestRecieve = (userId) => {
    setFriendsRequestRecieve((prev) => {
      console.log("prev", prev.requests);
      const newRequests = prev.requests.filter(
        (request) => request.userId !== userId
      );

      console.log("now", newRequests);
      return { requests: newRequests, total: prev.total - 1 };
    });
    setMainInformation((prev) => {
      const oldMainInfo = { ...prev };

      oldMainInfo.incomingRequest -= 1;
      return oldMainInfo;
    });
  };

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
  };
  return (
    <ProfileContext.Provider value={ctxValue}>
      {children}
    </ProfileContext.Provider>
  );
}
