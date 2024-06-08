import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import PinnedPostCard from "./PinnedPostCard";
import { Loader } from "../UI/Loader";

const Content__PinnedPosts = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/requestPosts/${groupId}`,
    "PINNED_POSTS"
  );
  const { groupPinnedPosts } = useContext(GroupContext);

  const posts = groupPinnedPosts.posts;
  return (
    <>
      <div className="M_A_M__Content__Container">
        {posts.map((post) => {
          return <PinnedPostCard key={post.post._idPost} data={post} your={false}  />;
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
            There are no posts
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__PinnedPosts;
