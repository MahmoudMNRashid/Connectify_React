import { createContext, useCallback, useState } from "react";

export const ProfileContext = createContext({
  selectedTap: "",
  selectTap: () => {},
  mainInformation: {},
  addMainInformation: () => {},
  editName: () => {},
  editBio: () => {},
  editFriendType: () => {},
});

export default function ProfileContextProvider({ children }) {
  const [selectedTap, setSelectedTap] = useState("");
  const [mainInformation, setMainInformation] = useState({});

  const handleSelect = (selectedTap) => {
    setSelectedTap(selectedTap);
  };

  const handleAddMainInformation = useCallback((data) => {
    setMainInformation(data);
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

  const ctxValue = {
    selectedTap,
    selectTap: handleSelect,
    mainInformation,
    addMainInformation: handleAddMainInformation,
    editName: handleEditName,
    editBio: handleEditBio,
    editFriendType: handleEditFriendTypes,
  };
  return (
    <ProfileContext.Provider value={ctxValue}>
      {children}
    </ProfileContext.Provider>
  );
}
