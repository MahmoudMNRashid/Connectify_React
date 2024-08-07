import { Toaster } from "react-hot-toast";
import NavBar from "../components/UI/NavBar";
import Post from "../components/Post/Post";
import { Loader } from "../components/UI/Loader";
import useFetchedPost from "../hooks/UseFetchedPost";
import ModalInstance from "../components/UI/Modals/Assets";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import CommentsModalInstance from "../components/UI/Modals/Comments";
import { host } from "../util/help";
import { MainContext, content } from "../context/MainContext";
import MainModalInstance from "../components/UI/Modals/MainModal";

import CreateButton from "../components/UI/CreateButton";
import { FaPlus } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { IoIosRefresh } from "react-icons/io";

const Home = () => {
  const { modalEditNameIsOpen, openModal } = useContext(MainContext);
  const { loading } = useFetchedPost(`${host}/profile/homePosts`, "HOME_POSTS");
  const { modalIsOpen, commentsModalIsOpen, addPostInformation } =
    useContext(PostContext);
  const { posts: data,resetPostsStates } = useContext(PostContext);
  const posts = data.posts;

  const openCreatePostModal = () => {
    addPostInformation({}, {}, {}, {}, {}, "home");
    openModal("post", content.CREATE_POST);
  };

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Toaster />
      <NavBar />
      {modalIsOpen && <ModalInstance />}
      {commentsModalIsOpen && <CommentsModalInstance />}
      {modalEditNameIsOpen && <MainModalInstance />}
      <div className="container">
        {posts.map((post) => {
          const owner = post.owner;
          const postContent = post.post;
          const groupContent = post.group ? post.group : null;
          const pageContent = post.page ? post.page : null;
          const permission = {
            postType: post.postType,
            fromAll: true,
            canDelete: post.canDelete,
            canUpdate: post.canUpdate,
            canReport: post.canReport ? post.canReport : null,
            canBlocked: post.canBlocked ? post.canBlocked : null,
            isHeOwnerOfPost: post.isHeOwnerOfPost,
            canCommentOrLike: post.canCommentOrLike
              ? post.canCommentOrLike
              : null,
          };

          return (
            <Post
              key={post.post._idPost}
              data={post}
              owner={owner}
              postContent={postContent}
              groupContent={groupContent}
              pageContent={pageContent}
              permission={permission}
              place="home"
            />
          );
        })}
        {loading && <Loader />}{" "}
        {!loading && posts.length === 0 && (
          <p
            style={{
              fontSize: "1rem",
              padding: "2rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              margin: "1rem",
            }}
          >
            No post. Create your first post
          </p>
        )}
      </div>

      <CreateButton
        style={{ bottom: "10px", right: "10px", backgroundColor: "#EECEB9" }}
        fn={openCreatePostModal}
        tooltip="Create Post"
        icon={FaPlus}
      />
      <CreateButton
        style={{ bottom: "10px", left: "10px", backgroundColor: "#987D9A" }}
        fn={resetPostsStates}
        tooltip="Refresh"
        icon={IoIosRefresh}
      />
    </div>
  );
};

export default Home;
