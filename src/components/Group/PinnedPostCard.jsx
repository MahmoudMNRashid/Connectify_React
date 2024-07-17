import { useContext } from "react";
import MiniPostGroup from "./MiniPostGroup";
import { GroupContext } from "../../context/GroupContext";
import classes from "./PinnedPostCard.module.css";
import useGroup from "../../hooks/UseGroup";
import { MainContext } from "../../context/MainContext";
const PinnedPostCard = ({ data, your }) => {
  const { disableIsActive } = useContext(MainContext);
  const { groupInformation } = useContext(GroupContext);
  const { acceptPinnedPost, rejectPinnedPost } = useGroup();

  const post = {
    postContent: data.post,
    permission: { postType: "group", fromAll: true },
    groupContent: {
      ...groupInformation,
    },
    owner: data.owner,
  };

  return (
    <div className={classes.container}>
      <MiniPostGroup post={post} your={your} />
      <div className={classes.buttons}>
        {!your && (
          <button
            disabled={disableIsActive}
            onClick={() => {
              rejectPinnedPost(post.postContent._idPost);
            }}
          >
            Reject
          </button>
        )}

        {!your && (
          <button
            disabled={disableIsActive}
            onClick={() => {
              acceptPinnedPost(post.postContent._idPost);
            }}
          >
            Accept
          </button>
        )}
      </div>
      {your && (
        <p className={classes.ps}>
          You can delete your post or edit it after accepting it from the admin
        </p>
      )}{" "}
    </div>
  );
};

export default PinnedPostCard;
