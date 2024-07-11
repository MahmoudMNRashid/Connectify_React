import { CiSearch } from "react-icons/ci";
import classes from "./SearchInPostCard.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { host } from "../../util/help";
import { useParams } from "react-router-dom";

import Post from "./Post";
import { Loader } from "../UI/Loader";
import useSearch from "../../hooks/UseSearch";
import { PostContext } from "../../context/PostContext";
import { GroupContext } from "../../context/GroupContext";
import { PageContext } from "../../context/PageContext";

const SearchInPostCard = () => {
  const { groupInformation } = useContext(GroupContext);
  const { pageInformation } = useContext(PageContext);
  let { userId, pageId, groupId } = useParams();
  const inputRef = useRef(null);
  const { resultSearch, resetResultSearch } = useContext(PostContext);

  const [url, setUrl] = useState("");
  const { loading } = useSearch(url);
  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    resetResultSearch();
    const profileUrl = `${host}/post/profile/search/${userId}?word=${query}`;
    const pageUrl = `${host}/post/page/search/${pageId}?word=${query}`;
    const groupUrl = `${host}/post/group/search/${groupId}?word=${query}`;
    const activeUrl = userId ? profileUrl : groupId ? groupUrl : pageUrl;
    setUrl(activeUrl);
  };
  const posts = resultSearch.posts;
  useEffect(() => {
    return () => {
      console.log("first");
      resetResultSearch();
    };
  }, [resetResultSearch]);
  return (
    <>
      <form
        className={classes["container--search"]}
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <input placeholder="Search..." ref={inputRef} />
        <button>
          <CiSearch />
        </button>
      </form>
      <div id="search_container" className={classes.container_searchpost}>
        {posts.map((post) => {
          if (userId) {
            var owner = post.owner;
            var postContent = post.post;
            var groupContent = null;
            var pageContent = null;
            var permission = {
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
          } else if (groupId) {
            const group = {
              name: groupInformation.name,
              groupId: groupInformation._id,
              description: groupInformation.description
                ? groupInformation.description
                : undefined,
              cover: groupInformation.cover
                ? groupInformation.cover
                : undefined,
              yourRoleInGroup: groupInformation.role,
            };

            post = { ...post, postType: "group", group };
          } else {
            const page = {
              name: pageInformation.name,
              pageId: pageInformation._id,
              logo: pageInformation.logo ? pageInformation.logo : undefined,
            };

            post = { ...post, postType: "page", page };
          }

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
        {!loading && posts.length === 0 && resultSearch.firstTime && (
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            No result
          </p>
        )}
        {!loading && !resultSearch.firstTime && <p>please search</p>}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default SearchInPostCard;
