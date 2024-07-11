import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import classes from "./BlockMemberCard.module.css";
import useGroup from "../../hooks/UseGroup";
import { PostContext } from "../../context/PostContext";
import usePost from "../../hooks/UsePost";
const BlockMemberCard = () => {
  const { disableIsActive } = useContext(MainContext);
  const { blockMemberOrAdmin } = useGroup();
  const { deletePost } = usePost();
  const { postInformation } = useContext(PostContext);
  console.log(postInformation);
  const userId = postInformation.owner.userId;
  const userRole = postInformation.postContent.userRole;
  const postId = postInformation.postContent._idPost;
  const groupId = postInformation.groupContent.groupId;
  const place = postInformation.place;
  const handleBLockMemberWithDeleteAllHisPost = async () => {
  
       
      blockMemberOrAdmin(userId, 0, userRole,groupId)
    
  };
  const handleBLockMemberWithoutDeleteAllHisPost = async () => {
    await Promise.all([
        deletePost("group", postId, undefined, groupId, place),
      blockMemberOrAdmin(userId, 1, userRole, groupId),
    ]);
  };
  return (
    <>
      <p>This post will be deleted.</p>
      <p> but do you also want to delete all previous posts for this member?</p>

      <footer className={classes.footer}>
        <button
          onClick={handleBLockMemberWithDeleteAllHisPost}
          disabled={disableIsActive}
        >
          Yes
        </button>
        <button
          onClick={handleBLockMemberWithoutDeleteAllHisPost}
          disabled={disableIsActive}
        >
          No
        </button>
      </footer>
    </>
  );
};

export default BlockMemberCard;
