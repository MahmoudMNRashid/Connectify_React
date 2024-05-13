import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import classes from "./Comment.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { convertDateFormat } from "../util/help";
import useComments from "../hooks/UseComments";
import { PostContext } from "../context/PostContext";
import { useContext } from "react";
const CommentCard = ({ comment }) => {
  const owner = comment.owner;
  const commentContent = comment.comment;
  const permission = {
    areYouOwnerofComment: comment.areYouOwnerofComment,
    canDelete: comment.canDelete,
    canUpdate: comment.canUpdate,
  };
  const { deleteComment: deleteCommentApi } = useComments();

  const { addActiveupdatedComment, addAssets, openModal } =
    useContext(PostContext);

  const handleAddAssetsToContextAndOpenTheModal = () => {
    addAssets(commentContent.assets);
    openModal("a");
    document.body.classList.add("hide__scroll");
  };

  const columnsCountBreakPoints = {
    350: 2,
    750: 2,
    900: 2,
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentApi(commentId);
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <img src={owner.logo?.asset.link} alt="" loading="lazy" />

          <div className={classes["container__name--date"]}>
            <div>
              <pre>{owner.firstName + " " + owner.lastName}</pre>
              <i>
                {permission.canDelete && (
                  <FaTrashAlt
                    color="red"
                    onClick={() => {
                      handleDeleteComment(commentContent.commentId);
                    }}
                  />
                )}
                {permission.canUpdate && (
                  <FaEdit
                    color="#008081"
                    widths={"10px"}
                    onClick={() => {
                      addActiveupdatedComment(comment);
                    }}
                  />
                )}
              </i>
            </div>
            <p className={classes.date}>
              {convertDateFormat(commentContent.createdAt)}
            </p>
          </div>
        </div>
        <p className={classes.desc}>{commentContent.description} </p>
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry gutter="8px">
            {commentContent.assets &&
              commentContent.assets.length > 0 &&
              commentContent.assets.map((asset) =>
                asset.resource_type === "image" ? (
                  <img
                    onClick={handleAddAssetsToContextAndOpenTheModal}
                    style={{ cursor: "pointer" }}
                    key={asset.public_id}
                    src={asset.link}
                    alt="error"
                  />
                ) : (
                  <video
                    onClick={handleAddAssetsToContextAndOpenTheModal}
                    style={{ cursor: "pointer" }}
                    key={asset.public_id}
                    controls
                    width="100%"
                  >
                    <source src={asset.link} type="video/mp4" />
                  </video>
                )
              )}
          
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default CommentCard;
