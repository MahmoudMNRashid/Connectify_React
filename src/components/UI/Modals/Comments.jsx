import { createPortal } from "react-dom";
import classes from "./Comments.module.css";
import { PostContext } from "../../../context/PostContext";
import { useContext } from "react";
import CommentCard from "../../Post/CommentCard";
import MiniPost from "../../Post/MiniPost";
import { MdOutlineCancel } from "react-icons/md";
import CreateComment from "../../Post/CreateComment";
import useFetchedComments from "../../../hooks/UseFetechedComments";
import Loader2 from "../Loader2";
import { MainContext } from "../../../context/MainContext";
const CommentsModal = () => {
  const { loading } = useFetchedComments();
  const {
    closeModal,
    comments,
    addActiveupdatedComment,
    changeModeToCreate,
    postInformation,
  } = useContext(PostContext);

  const handleCLoseTheCommentsModal = () => {
    closeModal("c");
    addActiveupdatedComment({});
    changeModeToCreate();
    document.body.classList.remove("hide__scroll");
  };

  const { disableIsActive } = useContext(MainContext);
  const commentsa = comments?.comments;
  return (
    <>
      <button
        disabled={disableIsActive}
        onClick={handleCLoseTheCommentsModal}
        className={classes.backdrop}
      ></button>

      <div className={classes.wrapper}>
        <div className={classes.header}>
          <button
            disabled={disableIsActive}
            onClick={handleCLoseTheCommentsModal}
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div id="allComments" className={classes.main__content}>
          <section>
            <MiniPost />
          </section>
          <section>
            {commentsa?.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment.commentId}
                  comment={comment}
                />
              );
            })}
            {!loading && commentsa?.length === 0 && (
              <p
                style={{
                  fontSize: "1rem",
                  padding: "2rem",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                No Comments
              </p>
            )}
            {loading && <Loader2 />}
          </section>
        </div>
        {postInformation.permission.canCommentOrLike && (
          <footer>
            <CreateComment />
          </footer>
        )}
      </div>
    </>
  );
};

const CommentsModalInstance = () => {
  return createPortal(<CommentsModal />, document.getElementById("modal"));
};

export default CommentsModalInstance;
