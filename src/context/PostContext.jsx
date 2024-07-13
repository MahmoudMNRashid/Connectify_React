import { createContext, useCallback, useState } from "react";
import { getFullName, getLogo, getUserId } from "../util/help";

export const PostContext = createContext({
  //all this for one post
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
  comments: { comments: [], total: 0, hasMore: true, firstTime: false },
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
  //all this for home posts
  posts: { posts: [], total: 0, hasMore: true, firstTime: false },

  addPosts: () => {},
  deletePost_: () => {},
  updatePost_: () => {},
  createPost_: () => {},
  deleteAllPostsForMember: () => {},
  resultSearch: { posts: [], total: 0, hasMore: true, firstTime: false },
  addResultSearch: () => {},
  resetResultSearch: () => {},
  likes: { likes: [], total: 0, hasMore: true, firstTime: false },
  addLikes: () => {},
  resetLikes: () => {},
});

export default function PostContextProvider({ children }) {
  const [assets, setAssets] = useState([]);
  const [postInformation, setPostInformation] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [commentsModalIsOpen, setCommentsModalIsOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false); //for comment (create or update)
  const [activeUpdatedComment, setActiveUpdatedComment] = useState({});

  const [comments, setComments] = useState({
    comments: [],
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
  const [resultSearch, setResultSearch] = useState({
    posts: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });
  const [likes, setLikes] = useState({
    likes: [],
    total: 0,
    hasMore: true,
    firstTime: false,
  });

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
  const handleAddResultSearch = useCallback(
    (newPosts, total, hasMore, firstTime) => {
      setResultSearch((prev) => {
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
  const handleResetResultSearch = useCallback(() => {
    setResultSearch({ posts: [], total: 0, hasMore: true, firstTime: false });
  }, []);
  const handleAddLikes = useCallback((newLikes, total, hasMore, firstTime) => {
    setLikes((prev) => {
      return {
        likes: [...prev.likes, ...newLikes],
        total,
        hasMore,
        firstTime,
      };
    });
  }, []);
  const handleResetLikes = useCallback(() => {
    setLikes({ likes: [], total: 0, hasMore: true, firstTime: false });
  }, []);

  const handleDeletePost = (postId) => {
    if (posts.firstTime) {
      setPosts((prev) => {
        const posts = prev.posts;

        const post = posts.find((post) => post.post._idPost !== postId);

        if (post) {
          const newPosts = posts.filter((post) => post.post._idPost !== postId);

          return {
            posts: newPosts,
            total: prev.total - 1,
            hasMore: prev.hasMore,
            firstTime: prev.firstTime,
          };
        }
        return prev;
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

        if (post) {
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
        } else {
          return prev;
        }
      });
    } else {
      return;
    }
  };
  const handleCreatePost = (newPost, place, info) => {
    if (posts.firstTime === true) {
      if (place === "group") {
        if (
          info.immediatePost === "anyoneInGroup" ||
          info.role === "moderator" ||
          info.role === "admin"
        ) {
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
                userRole: info.role,
              },
              group: {
                cover: info.cover,
                description: info.description,
                groupId: info._id,
                name: info.name,
                yourRoleInGroup: info.role,
              },
              postType: "group",
              isHeOwnerOfPost: true,
              canUpdate: true,
              canDelete: true,
              canReport: false,
              canBlock: false,
            };
            posts.unshift(post);

            return {
              posts,
              total: prev.total + 1,
              hasMore: prev.hasMore,
              firstTime: prev.firstTime,
            };
          });
        }
      } else if (place === "page") {
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
            },
            page: {
              pageId: info._id,
              name: info.name,
              logo: info.logo,
            },
            postType: "page",
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
            },
            postType: "profile",
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
      }
    } else {
      return;
    }
  };

  const handleDeleteAllPostsForMember = (userId) => {
    setPosts((prev) => {
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
    permission,
    place
  ) => {
    setPostInformation({
      owner,
      postContent,
      groupContent,
      pageContent,
      permission,
      place,
    });
  };

  const handleClearComments = () => {
    setComments({
      comments: [],
      total: 0,
      hasMore: true,
      firstTime: false,
    });
  };

  const handleGetComments = useCallback(
    (newComments, total, hasMore, firstTime) => {
      setComments((prev) => {
      
        return {
          comments: [...prev.comments, ...newComments],
          total,
          hasMore,
          firstTime,
        };
      });
    },
    []
  );
  const handleDeleteComment = (commentId) => {
    setComments((prev) => {
      const oldComments = [...prev.comments];

      const newComments = oldComments.filter((comment) => {
        return comment.comment.commentId !== commentId;
      });

      return {
        comments: newComments,
        total: prev.total - 1,
        firstTime: prev.firstTime,
        hasMore: prev.hasMore,
      };
    });

    setPostInformation((prevPost) => {
      const newPost = { ...prevPost };

      newPost.postContent.numberOfComments -= 1;
      return newPost;
    });
  };
  const handleUpdateComment = (newComment) => {
    setComments((prev) => {
      const allComments = [...prev.comments];

      const oldComment = allComments.find((c) => {
        return c.comment.commentId === newComment._id;
      });

      oldComment.comment.assets = [...newComment.assets];
      oldComment.comment.description = newComment.description;

      return {
        comments: allComments,
        total: prev.total,
        firstTime: prev.firstTime,
        hasMore: prev.hasMore,
      };
    });
  };
  const handleAddComment = (newComment) => {
  
    setComments((prev) => {
      const isFoundlogo = getLogo();

      const logo =
        isFoundlogo !== "undefined" ? { logo: isFoundlogo } : undefined;
      const comment = {
        comment: {
          description: newComment.description,
          assets: newComment.assets,
          createdAt: newComment.createdAt,
          commentId: newComment._id,
        },
        areYouOwnerOfComment: true,
        canUpdate: true,
        canDelete: true,
        owner: {
          firstName: getFullName().split("   ")[0],
          lastName: getFullName().split("   ")[1],
          ...logo,
          userId: newComment.userId,
        },
      };

      const allComments = [...prev.comments];
      allComments.unshift(comment);
      return {
        comments: allComments,
        total: prev.total + 1,
        firstTime: prev.firstTime,
        hasMore: prev.hasMore,
      };
    });
    setPostInformation((prevPost) => {
      const newPost = { ...prevPost };

      newPost.postContent.numberOfComments += 1;
      return newPost;
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
    posts,
    addPosts: handleAddPosts,
    deletePost_: handleDeletePost,
    updatePost_: handleUpdatePost,
    createPost_: handleCreatePost,
    deleteAllPostsForMember: handleDeleteAllPostsForMember,
    resultSearch,
    addResultSearch: handleAddResultSearch,
    resetResultSearch: handleResetResultSearch,
    likes,
    addLikes: handleAddLikes,
    resetLikes: handleResetLikes,
  };
  return (
    <PostContext.Provider value={ctxValue}>{children}</PostContext.Provider>
  );
}
