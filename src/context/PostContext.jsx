import { createContext, useCallback, useState } from "react";
import { getFullName, getLogo } from "../util/help";

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
  updateComment: () => {},
  deleteComment: () => {},
  addComment: () => {},
  activeUpdatedComment: {},
  addActiveupdatedComment: () => {},
  isUpdateMode: false,
  changeModeToCreate: () => {},
  changeModeToUpdate: () => {},
});

export default function PostContextProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [postInformation, setPostInformation] = useState({});
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false); //for comment (create or update)
  const [activeUpdatedComment, setActiveUpdatedComment] = useState({});

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

  const handleClearComments = () => {
    setComments([]);
  };
  const handleGetComments = useCallback((comments) => {
    setComments((prevData) => [...prevData, ...comments]);
  }, []);

  const handleDeleteComment = (commentId) => {
    setComments((prevComment) => {
      const oldComments = [...prevComment];

      const newComments = oldComments.filter((comment) => {
        return comment.comment.commentId !== commentId;
      });

      return newComments;
    });

    setPostInformation((prevPost) => {
      const newPost = { ...prevPost };

      newPost.postContent.numberOfComments -= 1;
      return newPost;
    });
  };
  const handleUpdateComment = (newComment) => {
    setComments((prev) => {
      const allComments = [...prev];
      console.log("all", allComments);
      const oldComment = allComments.find((c) => {
        return c.comment.commentId === newComment._id;
      });
      console.log(oldComment);
      oldComment.comment.assets = [...newComment.assets];
      oldComment.comment.description = newComment.description;

      return allComments;
    });
  };
  const handleAddComment = (newComment) => {
    setComments((prev) => {
      const fullName = getFullName();
      const isFoundlogo = getLogo();
      console.log(isFoundlogo);
      const logo =
        isFoundlogo !== "undefined" ? { logo: isFoundlogo } : undefined;
      const comment = {
        comment: {
          description: newComment.description,
          assets: newComment.assets,
          createdAt: newComment.createdAt,
          commentId: crypto.randomUUID(),
        },
        areYouOwnerOfComment: true,
        canUpdate: true,
        canDelete: true,
        owner: {
          firstName: fullName.firstName,
          lastName: fullName.lastName,
          ...logo,
          userId: newComment.userId,
        },
      };
      console.log(comment);
      const allComments = [...prev];

      return [comment, ...allComments];
    });
  };

  const handleAddActiveupdatedComment = (comment) => {
    setActiveUpdatedComment(comment);
  };

  const handleChangeModeToCreate = useCallback(() => {
    setIsUpdateMode(false);
  }, []);
  const handleChangeModeToUpdate = useCallback(() => {
    setIsUpdateMode(true);
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
    deleteComment: handleDeleteComment,
    updateComment: handleUpdateComment,
    addComment: handleAddComment,
    activeUpdatedComment,
    addActiveupdatedComment: handleAddActiveupdatedComment,
    isUpdateMode,
    changeModeToUpdate: handleChangeModeToUpdate,
    changeModeToCreate: handleChangeModeToCreate,
  };
  return (
    <PostContext.Provider value={ctxValue}>{children}</PostContext.Provider>
  );
}
