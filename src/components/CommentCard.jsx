import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import classes from "./Comment.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { convertDateFormat } from "../util/help";
const CommentCard = ({ comment }) => {
  const owner = comment.owner;
  const commentContent = comment.comment;
  const permission = {
    areYouOwnerofComment: comment.areYouOwnerofComment,
    canDelete: comment.canDelete,
    canUpdate: comment.canUpdate,
  };
  const columnsCountBreakPoints = {
    350: 2,
    750: 2,
    900: 2,
  };

  console.log(convertDateFormat("2024-04-28T21:02:58.280Z"));

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <img src={owner.logo?.asset.link} alt="" loading="lazy" />

          <div className={classes["container__name--date"]}>
            <div>
              <pre>{owner.firsName + " " + owner.lastName}</pre>
              <i>
                {permission.canDelete && <FaTrashAlt color="red" />}
                <FaEdit color="#008081" widths={'10px'}  />
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
            {commentContent.assets?.map((asset) =>
              asset.resource_type === "image" ? (
                <img
                  //   onClick={handleAddAssetsToContextAndOpenTheModal}
                  style={{ cursor: "pointer" }}
                  key={asset.public_id}
                  src={asset.link}
                  alt="error"
                />
              ) : (
                <video
                  //   onClick={handleAddAssetsToContextAndOpenTheModal}
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
