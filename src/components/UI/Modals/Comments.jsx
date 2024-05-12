import { createPortal } from "react-dom";
import classes from "./Comments.module.css";
import { PostContext } from "../../../context/PostContext";
import { useContext} from "react";
import CommentCard from "../../CommentCard";
import MiniPost from "../../MiniPost";
import { MdOutlineCancel } from "react-icons/md";
import CreateComment from "../../CreateComment";
import useFetchedComments from "../../../hooks/UseFetechedComments";
import Loader2 from "../Loader2";
const CommentsModal = () => {
  const { closeModal, comments } = useContext(PostContext);

  const handleCLoseTheCommentsModal = () => {
    closeModal("c");
    document.body.classList.remove("hide__scroll");
  };

  const { loading } = useFetchedComments();

 

  console.log(comments);
  return (
    <>
      <button
       
        onClick={handleCLoseTheCommentsModal}
        className={classes.backdrop}
      ></button>

      <div className={classes.wrapper}>
        <div className={classes.header}>
          <button  onClick={handleCLoseTheCommentsModal}>
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
          <CreateComment  />
        </footer>
      </div>
    </>
  );
};

const CommentsModalInstance = () => {
  return createPortal(<CommentsModal />, document.getElementById("modal"));
};

export default CommentsModalInstance;
