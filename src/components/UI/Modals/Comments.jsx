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
  const { closeModal, comments, addActiveupdatedComment, changeModeToCreate } =
    useContext(PostContext);

  const handleCLoseTheCommentsModal = () => {
    closeModal("c");
    addActiveupdatedComment({});
    changeModeToCreate();
    document.body.classList.remove("hide__scroll");
  };

  const { loading } = useFetchedComments();

  const { disableIsActive } = useContext(MainContext);

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
            {comments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment.commentId}
                  comment={comment}
                />
              );
            })}
            {loading && <Loader2 />}
          </section>
        </div>
        <footer>
          <CreateComment />
        </footer>
      </div>
    </>
  );
};

const CommentsModalInstance = () => {
  return createPortal(<CommentsModal />, document.getElementById("modal"));
};

export default CommentsModalInstance;
