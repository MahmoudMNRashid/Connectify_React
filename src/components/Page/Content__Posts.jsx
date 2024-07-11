import { useParams } from "react-router";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { PageContext } from "../../context/PageContext";
import { useContext } from "react";
import Post from "../Post/Post";
import { Loader } from "../UI/Loader";
import CreateButton from "../UI/CreateButton";
import { MainContext, content } from "../../context/MainContext";
import { PostContext } from "../../context/PostContext";
import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const Content__Posts = () => {
  let { pageId } = useParams();
  const { loading } = useFetchedPost(
    `${host}/page/posts/${pageId}`,
    "POSTS_PAGE"
  );
  const { pageInformation, pagePosts } = useContext(PageContext);
  const posts = pagePosts.posts;
  const { openModal } = useContext(MainContext);
  const { addPostInformation } = useContext(PostContext);
  const openCreatePostModal = () => {
    addPostInformation({}, {}, {}, {}, {}, "page");
    openModal("post", content.CREATE_POST);
  };
  const openSearchInPostModal = () => {
    openModal("post", content.SEARCH_IN_POSTS);
  };
  return (
    <div className="PostContent__Container">
      {posts.map((post) => {
        const page = {
          name: pageInformation.name,
          pageId: pageInformation._id,
          logo: pageInformation.logo ? pageInformation.logo : undefined,
        };

        post = { ...post, postType: "page", page };
        return <Post key={post.post._idPost} data={post} place="page" />;
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

      {pageInformation.isHeOwner && (
        <CreateButton
          style={{ bottom: "10px", right: "10px", backgroundColor: "#9B86BD" }}
          fn={openCreatePostModal}
          tooltip="Create Post"
          icon={FaPlus}
        />
      )}
      <CreateButton
              fn={openSearchInPostModal}
          style={{ bottom: "70px", right: "10px", backgroundColor: "#5A639C" }}
          tooltip="Search in posts..."
          icon={IoSearchOutline}
      />
    </div>
  );
};

export default Content__Posts;
