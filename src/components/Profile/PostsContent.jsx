import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { Loader } from "../UI/Loader";
import Post from "../Post/Post";
import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import CreateButton from "../UI/CreateButton";
import { MainContext, content } from "../../context/MainContext";
import { PostContext } from "../../context/PostContext";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const PostsContent = () => {
  const { openModal } = useContext(MainContext);
  const { addPostInformation } = useContext(PostContext);

  let { userId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/profile/posts/${userId}`,
    "PROFILE_POSTS"
  );
  const { posts, mainInformation } = useContext(ProfileContext);
 
  const openCreatePostModal = () => {
    addPostInformation({}, {}, {}, {}, {}, "profile");
    openModal("post", content.CREATE_POST);
  };
  const openSearchInPostModal = () => {
    openModal("post", content.SEARCH_IN_POSTS);
  };
  return (
    <div className="container__profile">
      {posts.posts.map((post) => {
        const owner = post.owner;
        const postContent = post.post;
        const groupContent = null;
        const pageContent = null;
        const permission = {
          postType: "profile",
          fromAll: false,
          canDelete: post.CanDelete,
          canUpdate: post.CanUpdate,
          canReport: post.CanReport ? post.CanReport : null,
          canBlocked: post.canBlocked ? post.canBlocked : null,
          isHeOwnerOfPost: post.isHeOwnerOfPost,
          canCommentOrLike: post.canCommentOrLike
            ? post.canCommentOrLike
            : null,
        };
        post = { ...post, postType: "profile" };
        return (
          <Post
            key={post.post._idPost}
            data={post}
            owner={owner}
            postContent={postContent}
            groupContent={groupContent}
            pageContent={pageContent}
            permission={permission}
            place="profile"
          />
        );
      })}
      {!loading && posts.length === 0 && (
        <p
          className="no"
        >
          No post
        </p>
      )}
      {loading && <Loader />}
      {mainInformation.isHeOwner && (
        <CreateButton
          fn={openCreatePostModal}
          style={{ bottom: "10px", right: "10px", backgroundColor: "#003C43" }}
          tooltip="Create Post"
          icon={FaPlus}
        />
      )}
      {mainInformation.isHeOwner && (
        <CreateButton
          fn={openSearchInPostModal}
          style={{ bottom: "10px", left: "10px", backgroundColor: "#135D66" }}
          tooltip="Search in posts..."
          icon={IoSearchOutline}
        />
      )}
    </div>
  );
};

export default PostsContent;
