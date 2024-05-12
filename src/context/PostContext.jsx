import { createContext, useCallback, useState } from "react";

export const PostContext = createContext({
  assets: [],
  addAssets: () => {},
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
  postInformation: {
    owner: {},
    postContent: {},
    groupContent: {},
    pageContent: {},
    permission: {},
  },
  addPostInformation: () => {},
  commentsModalIsOpen: false,
  comments: [],
  getComments: () => {},
  clearComments: () => {},
  isAddComment: true,
  updateComment: () => {},
  deleteComment: () => {},
});

export default function PostContextProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [postInformation, setPostInformation] = useState({});
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [isAddComment, setIsAddComment] = useState(true);

  const handleOpenModal = (key) => {
    if (key === "a") {
      setModalIsOpen(true);
    }

    if (key === "c") {
      setCommentsModalIsOpen(true);
    }
  };

  const handleCloseModal = (key) => {
    if (key === "a") {
      setModalIsOpen(false);
    }

    if (key === "c") {
      setCommentsModalIsOpen(false);
    }
  };

  const handelAddAssets = (assets) => {
    setAssets(assets);
  };

  const handleAddPostInformation = (
    owner,
    postContent,
    groupContent,
    pageContent,
    permission
  ) => {
    setPostInformation({
      owner,
      postContent,
      groupContent,
      pageContent,
      permission,
    });
  };
  const handleChangeBetweenAddAndUpdateComment = () => {
    setIsAddComment((prev) => !prev);
  };

  const handleClearComments = () => {
    setComments([]);
  };
  const handleGetComments = useCallback((comments) => {
    setComments((prevData) => [...prevData, ...comments]);
  }, []);

  const ctxValue = {
    comments,
    assets,
    addAssets: handelAddAssets,
    modalIsOpen,
    commentsModalIsOpen,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    postInformation,
    addPostInformation: handleAddPostInformation,
    getComments: handleGetComments,
    clearComments: handleClearComments,
    isAddComment:isAddComment,
    ChangeBetweenAddAndUpdateComment:handleChangeBetweenAddAndUpdateComment
  };
  return (
    <PostContext.Provider value={ctxValue}>{children}</PostContext.Provider>
  );
}
