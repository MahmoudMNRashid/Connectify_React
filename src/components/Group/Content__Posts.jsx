import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import Post from "../Post/Post";
import { Loader } from "../UI/Loader";
import CreateButton from "../UI/CreateButton";
import { MainContext, content } from "../../context/MainContext";
import { PostContext } from "../../context/PostContext";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

const Content__Posts = () => {
  let { groupId } = useParams();
  const { loading } = useFetchedPost(`${host}/group/posts/${groupId}`, "POSTS");
  const { groupInformation, groupPosts } = useContext(GroupContext);

  const posts = groupPosts.posts;
  const { openModal } = useContext(MainContext);
  const { addPostInformation } = useContext(PostContext);
  const openCreatePostModal = () => {
    addPostInformation({}, {}, {}, {}, {}, "group");
    openModal("post", content.CREATE_POST);
  };
  const openSearchInPostModal = () => {
    openModal("post", content.SEARCH_IN_POSTS);
  };
  return (
    <div className="PostContent__Container">
      {posts.map((post) => {
        const group = {
          name: groupInformation.name,
          groupId: groupInformation._id,
          description: groupInformation.description
            ? groupInformation.description
            : undefined,
          cover: groupInformation.cover ? groupInformation.cover : undefined,
          yourRoleInGroup: groupInformation.role,
        };

        post = { ...post, postType: "group", group };
        return <Post key={post.post._idPost} data={post} place="group" />;
      })}
      {!loading && posts.length === 0 && (
        <p
          style={{
            fontSize: "2rem",
            padding: "2.5rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          There Are No Post Yet
        </p>
      )}
      {loading && <Loader />}
      {(groupInformation.role !== "not member" &&
        groupInformation.whoCanPost === "anyoneInGroup") ||
        ((groupInformation.role === "admin" ||
          groupInformation.role === "moderator") && (
          <CreateButton
            fn={openCreatePostModal}
            tooltip="Create Post"
            icon={FaPlus}
            style={{
              bottom: "10px",
              right: "10px",
              backgroundColor: "#9B86BD",
            }}
          />
        ))}
      {groupInformation.role !== "not member" && (
        <CreateButton
          fn={openSearchInPostModal}
          style={{ bottom: "70px", right: "10px", backgroundColor: "#5A639C" }}
          tooltip="Search in posts..."
          icon={IoSearchOutline}
        />
      )}
    </div>
  );
};

export default Content__Posts;