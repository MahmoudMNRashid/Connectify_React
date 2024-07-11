import { useContext, useEffect } from "react";
import { Loader } from "../UI/Loader";
import { PostContext } from "../../context/PostContext";
import classes from "./LikesCard.module.css";
import { host } from "../../util/help";
import useFetchedLikes from "../../hooks/UseFetchedLikes";
import LikeCard from "./LikeCard";
const LikesCard = () => {
  const { postInformation } = useContext(PostContext);
  
  const { likes, resetLikes } = useContext(PostContext);
  let url = `${host}/post/`;
  if (postInformation.groupContent) {
    url += `group/likes/${postInformation.groupContent.groupId}/${postInformation.postContent._idPost}`;
  } else if (postInformation.pageContent) {
    url += `page/likes/${postInformation.pageContent.pageId}/${postInformation.postContent._idPost}`;
  } else {
    url += `profile/likes/${postInformation.owner.userId}/${postInformation.postContent._idPost}`;
  }
  const { loading } = useFetchedLikes(url);
  useEffect(() => {
    return () => {
      resetLikes();
    };
  }, [resetLikes]);
  return (
    <>
      <div id="search_container" className={classes.container_searchpost}>
        {likes.likes.map((like) => {
          return <LikeCard key={like.userId} like={like} />;
        })}
        {!loading && likes.likes.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            No Likes
          </p>
        )}

        {loading && <Loader />}
      </div>
    </>
  );
};

export default LikesCard;
