import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import Post from "../Post";
import { Loader } from "../UI/Loader";

const Content__Posts = () => {
  let { groupId } = useParams();
  const { loading } = useFetchedPost(`${host}/group/posts/${groupId}`,'POSTS');
  const { groupInformation, groupPosts } = useContext(GroupContext);
//   useEffect(() => {
//     resetGroupPosts({ posts: [], total: 0 });
// }, [resetGroupPosts]);
  const posts = groupPosts.posts;
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
        return <Post key={post.post._idPost} data={post} />;
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
    </div>
  );
};

export default Content__Posts;
