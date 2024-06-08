import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import { host } from "../../util/help";
import PinnedPostCard from "./PinnedPostCard";
import { Loader } from "../UI/Loader";

const Content__YourPinnedPosts = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/yourRequestPosts/${groupId}`,
    "YOUR_PINNED_POSTS"
  );
  const { groupYourPinnedPosts } = useContext(GroupContext);

  const posts = groupYourPinnedPosts.posts;
  return (
    <>
      <div className="M_A_M__Content__Container">
        {posts.map((post) => {
          return <PinnedPostCard key={post.post._idPost} data={post} your />;
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

export default Content__YourPinnedPosts;
