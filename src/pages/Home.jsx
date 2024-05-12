import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import { Loader } from "../components/UI/Loader";
import useFetchedPost from "../hooks/UseFetchedPost";
import ModalInstance from "../components/UI/Modals/Assets";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import CommentsModalInstance from "../components/UI/Modals/Comments";

const Home = () => {
  const { data: posts, loading } = useFetchedPost([]);
  const { modalIsOpen, commentsModalIsOpen } = useContext(PostContext);

  return (
    <div>
      <Toaster />
      <NavBar />
      {modalIsOpen && <ModalInstance />}
      {commentsModalIsOpen && <CommentsModalInstance />}
      <div className="container">
        {posts.map((post) => {
          const owner = post.owner;
          const postContent = post.post;
          const groupContent = post.group ? post.group : null;
          const pageContent = post.page ? post.page : null;
          const permission = {
            postType: post.postType,
            fromAll: true,
            canDelete: post.CanDelete,
            canUpdate: post.CanUpdate,
            canReport: post.CanReport ? post.CanReport : null,
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
            />
          );
        })}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Home;
