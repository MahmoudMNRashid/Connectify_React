import { createContext, useCallback, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const content = Object.freeze({
  ADD_BIO: "add bio",
  EDIT_BIO: "edit bio",
  EDIT_NAME: "edit name",
  EDIT_BACKGROUND: "edit background",
  ADD_BACKGROUND: "add background",
  ADD_RATE: "add rate",
  EDIT_RATE: "edit rate",
  EDIT_POST: "edit post",
  ADD_REPORT: "edit report",
  BLOCK_MEMBER: "block member",
  CREATE_POST: "create post",
  CREATE_PAGE: "create page",
  CREATE_GROUP: "create group",
  ADD_BIO_PAGE: "add bio page",
  EDIT_BIO_PAGE: "edit bio page",
  EDIT_CATEGORIES: "edit categories",
  EDIT_LOGO_PAGE: "edit logo page",
  ADD_LOGO_PAGE: "add logo page",
  EDIT_COVER_PAGE: "edit cover page",
  ADD_COVER_PAGE: "add cover page",
  HANDLE_LOGO: "handle logo",
  SEARCH_IN_POSTS: "search in posts",
  LIKES: "likes",
});

export const MainContext = createContext({
  disableIsActive: false,
  startTheDisable: () => {},
  stopTheDisable: () => {},
  /////////////////////////
  modalEditNameIsOpen: false,
  contentModal: "",
  openModal: () => {},
  closeModal: () => {},
  ///////////////////////
  confirmModalIsOpen: false,
  activeFn: () => {},
  openConfirmModal: () => {},
  closeConfirmModal: () => {},
  ///////////////////////
  pagesResult: { pages: [], total: 0, hasMore: true, firstTime: false },
  usersResult: { users: [], total: 0, hasMore: true, firstTime: false },
  groupsResult: { groups: [], total: 0, hasMore: true, firstTime: false },
  addPagesResult: () => {},
  addGroupsResult: () => {},
  addUsersResult: () => {},
  resetPagesResultSearch: () => {},
  resetGroupsResultSearch: () => {},
  resetUsersResultSearch: () => {},
  ////////////////////////
  showTabsMobile: false,
  openTabsMobile: () => {},
  closeTabsMobile: () => {},
  ///////////////////////
  modalErrorIsOpen: false,
  openErrorModal: () => {},
  closeErrorModal: () => {},
});

export default function MainContextProvider({ children }) {
  const [disableIsActive, setDisableIsActive] = useState(false);
  const handleStartTheDisable = useCallback(() => {
    setDisableIsActive(true);
  }, []);
  const handleStopTheDisable = useCallback(() => {
    setDisableIsActive(false);
  }, []);
  //////////////////////////////////////
  const [contentModal, setContentModal] = useState("");
  const [modalEditNameIsOpen, setModalEditNameIsOpen] = useState(false);

  const handleOpenModal = (key, contentM) => {
    const contentMap = {
      name: {
        [content.EDIT_NAME]: content.EDIT_NAME,
      },
      bio: {
        [content.ADD_BIO]: content.ADD_BIO,
        [content.EDIT_BIO]: content.EDIT_BIO,
      },
      background: {
        [content.EDIT_BACKGROUND]: content.EDIT_BACKGROUND,
        [content.ADD_BACKGROUND]: content.ADD_BACKGROUND,
      },
      rate: {
        [content.ADD_RATE]: content.ADD_RATE,
        [content.EDIT_RATE]: content.EDIT_RATE,
      },
      post: {
        [content.EDIT_POST]: content.EDIT_POST,
        [content.CREATE_POST]: content.CREATE_POST,
        [content.SEARCH_IN_POSTS]: content.SEARCH_IN_POSTS,
        [content.LIKES]: content.LIKES,
      },
      report: {
        [content.ADD_REPORT]: content.ADD_REPORT,
      },
      member: {
        [content.BLOCK_MEMBER]: content.BLOCK_MEMBER,
      },
      page: {
        [content.CREATE_PAGE]: content.CREATE_PAGE,
        [content.ADD_BIO_PAGE]: content.ADD_BIO_PAGE,
        [content.EDIT_BIO_PAGE]: content.EDIT_BIO_PAGE,
        [content.EDIT_CATEGORIES]: content.EDIT_CATEGORIES,
        [content.EDIT_LOGO_PAGE]: content.EDIT_LOGO_PAGE,
        [content.ADD_LOGO_PAGE]: content.ADD_LOGO_PAGE,
        [content.EDIT_COVER_PAGE]: content.EDIT_COVER_PAGE,
        [content.ADD_COVER_PAGE]: content.ADD_COVER_PAGE,
      },
      group: {
        [content.CREATE_GROUP]: content.CREATE_GROUP,
      },
      profile: {
        [content.HANDLE_LOGO]: content.HANDLE_LOGO,
      },
    };

    if (contentMap[key] && contentMap[key][contentM]) {
      setModalEditNameIsOpen(true);
      setContentModal(contentMap[key][contentM]);
      document.body.classList.add("hide__scroll");
    }
  };

  const handleCloseModal = () => {
    setModalEditNameIsOpen(false);
    document.body.classList.remove("hide__scroll");
  };
  ////////////////////////////////////
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [activeFn, setActiveFn] = useState(null);

  const handleOpenconfirmModal = (fn) => {
    setConfirmModalIsOpen(true);
    setActiveFn(() => fn);
  };
  const handleCLoseconfirmModal = () => {
    setConfirmModalIsOpen(false);
    setActiveFn(null);
  };
  //////////////////////////////////
  const [pagesResult, setPagesResult] = useState({
    pages: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [groupsResult, setGroupsResult] = useState({
    groups: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [usersResult, setUsersResult] = useState({
    users: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

  const handleAddPagesResult = useCallback(
    (newPages, total, hasMore, firstTime) => {
      setPagesResult((prev) => {
        return {
          pages: [...prev.pages, ...newPages],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddGroupsResult = useCallback(
    (newGroups, total, hasMore, firstTime) => {
      setGroupsResult((prev) => {
        return {
          groups: [...prev.groups, ...newGroups],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleAddUsersResult = useCallback(
    (newUsers, total, hasMore, firstTime) => {
      setUsersResult((prev) => {
        return {
          users: [...prev.users, ...newUsers],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleResetPagesResultSearch = useCallback(() => {
    setPagesResult({ pages: [], total: 0, hasMore: true, firstTime: false });
  }, []);

  const handleResetGroupsResultSearch = useCallback(() => {
    setGroupsResult({ groups: [], total: 0, hasMore: true, firstTime: false });
  }, []);

  const handleResetUsersResultSearch = useCallback(() => {
    setUsersResult({ users: [], total: 0, hasMore: true, firstTime: false });
  }, []);
  ///////////////////
  const [showTabsMobile, setShowTabsMobile] = useState(false);
  const handleOpenTabsMobile = () => {
    setShowTabsMobile(true);
  };
  const handleCloseTabsMobile = () => {
    setShowTabsMobile(false);
  };
  const handleOpenCloseTabsMobile = useCallback(() => {
    setShowTabsMobile((prev) => !prev);
  }, []);
  ///////////////////
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false);

  const handleOpenErrorModal = useCallback(() => {
    setModalErrorIsOpen(true);
  }, []);
  const handleCloseErrorModal = useCallback(() => {
    setModalErrorIsOpen(false);
  }, []);

  const ctxValue = {
    disableIsActive,
    startTheDisable: handleStartTheDisable,
    stopTheDisable: handleStopTheDisable,
    /////////////////////////
    modalEditNameIsOpen,
    contentModal,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    /////////////////////////
    confirmModalIsOpen,
    openConfirmModal: handleOpenconfirmModal,
    closeConfirmModal: handleCLoseconfirmModal,
    activeFn,
    //////////////////
    pagesResult,
    usersResult,
    groupsResult,
    addPagesResult: handleAddPagesResult,
    addGroupsResult: handleAddGroupsResult,
    addUsersResult: handleAddUsersResult,
    resetPagesResultSearch: handleResetPagesResultSearch,
    resetGroupsResultSearch: handleResetGroupsResultSearch,
    resetUsersResultSearch: handleResetUsersResultSearch,
    ///////
    showTabsMobile,
    openTabsMobile: handleOpenTabsMobile,
    closeTabsMobile: handleCloseTabsMobile,
    openCloseTabsMobile: handleOpenCloseTabsMobile,
    ///////////////
    modalErrorIsOpen,
    openErrorModal: handleOpenErrorModal,
    closeErrorModal: handleCloseErrorModal,
  };
  return (
    <MainContext.Provider value={ctxValue}>{children}</MainContext.Provider>
  );
}
