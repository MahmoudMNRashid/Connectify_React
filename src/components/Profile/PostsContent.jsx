import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { Loader } from "../UI/Loader";
import Post from "../Post";

const PostsContent = () => {
  let { userId } = useParams();
  const { data: posts, loading } = useFetchedPost(
    `${host}/profile/posts/${userId}`
  );

  console.log(posts);
  return (
    <div className="container__profile">
      {posts.map((post) => {
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
          />
        );
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

export default PostsContent;
