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
});

export default function ProfileContextProvider({ children }) {
  const [selectedTap, setSelectedTap] = useState("");
  const [mainInformation, setMainInformation] = useState({});
  const [friends, setFriends] = useState({});

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
            newInfo.birthDay = data.birthDay;
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
      else if (type==='ADD'){
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

      }

      else if (type==='DELETE'){
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

      }
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
  };
  return (
    <ProfileContext.Provider value={ctxValue}>
      {children}
    </ProfileContext.Provider>
  );
}
