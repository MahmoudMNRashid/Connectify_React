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
          return (
            <PinnedPostCard key={post.post._idPost} data={post} your={false} />
          );
        })}
        {!loading && posts.length === 0 && <p className="no">No posts</p>}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__PinnedPosts;
