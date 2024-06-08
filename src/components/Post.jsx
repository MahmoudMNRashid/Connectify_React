import { useContext, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import classes from "./Post.module.css";
import like from "../assets/small-like.svg";
import noLike from "../assets/big-no-like.svg";
import bigLike from "../assets/big-like-green.svg";
import bigComment from "../assets/big-comment.svg";
import comment from "../assets/small-comment.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import defaultImageGroup from "../assets/post/group_default.jpg";
import defaultImageProfile from "../assets/post/profile_default.svg";
import defaultImagePage from "../assets/post/page_default.svg";
import useLikedUnLikedPost from "../hooks/UseLikedUnlikedPost.js";
import { PostContext } from "../context/PostContext.jsx";
import { convertDateFormat } from "../util/help.js";
import { useNavigate } from "react-router-dom";

const Post = ({ data }) => {
  // console.log(data)
  //Hooks
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  //Variables
  const textLimit = 300; // Adjust this value as needed for your text length preference
  const owner = data.owner;
  const postContent = data.post;
  const groupContent = data.group ? data.group : null;
  const pageContent = data.page ? data.page : null;
  const permission = {
    postType: data.postType,
    fromAll: true,
    canDelete: data.CanDelete,
    canUpdate: data.CanUpdate,
    canReport: data.CanReport ? data.CanReport : null,
    canBlocked: data.canBlocked ? data.canBlocked : null,
    isHeOwnerOfPost: data.isHeOwnerOfPost,
    canCommentOrLike: data.canCommentOrLike ? data.canCommentOrLike : null,
  };

  //Functions

  const handleMoveToGroup = () => {
    navigate(`/group/${groupContent.groupId}`);
  };
  const handleMoveToPage = () => {
    navigate(`/page/${pageContent.pageId}`);
  };
  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedText = isExpanded
    ? postContent.description
    : postContent.description.substring(0, textLimit);

  let contentImage = <div> error post</div>;
  if (permission.postType === "group" && permission.fromAll) {
    contentImage = (
      <div className={classes["container-images"]}>
        <img
          onClick={handleMoveToGroup}
          src={groupContent.cover ? groupContent.cover.link : defaultImageGroup}
        />
        <img
          src={
            data.owner.logo ? data.owner.logo.asset.link : defaultImageProfile
          }
        />
      </div>
    );
  } else if (permission.postType === "group" && !permission.fromAll) {
    contentImage = (
      <img src={owner.logo ? owner.logo.asset.link : defaultImageProfile} />
    );
  } else if (permission.postType === "profile") {
    contentImage = (
      <img src={owner.logo ? owner.logo.asset.link : defaultImageProfile} />
    );
  } else {
    contentImage = (
      <img
        onClick={handleMoveToPage}
        src={pageContent.logo ? pageContent.logo.link : defaultImagePage}
      />
    );
  }

  const contentName =
    permission.postType === "group" || permission.postType === "profile" ? (
      <p>{owner.firsName + "   " + owner.lastName}</p>
    ) : (
      <p>{pageContent.name}</p>
    );

  let contentDate;
  if (permission.postType === "group" && permission.fromAll) {
    contentDate = (
      <span className={classes.datee}>
        <span onClick={handleMoveToGroup}>{groupContent.name}</span>
        <span className={`${classes.date} ${classes.DateGroup}`}>
          {convertDateFormat(postContent.createdAt)}
        </span>
      </span>
    );
  } else {
    contentDate = (
      <span className={`${classes.date}`}>
        {convertDateFormat(postContent.createdAt)}
      </span>
    );
  }
  const columnsCountBreakPoints = {
    350: 1,
    750: 2,
    900: postContent.assets.length === 1 ? 1 : 2,
  };

  const configLikedUnLiked = {
    isHeLikedInPost: postContent.isHeLikedInPost,
    numberOfLikes: postContent.numberOfLikes,
    postType: permission.postType,
    _idPost: postContent._idPost,
    pageId: pageContent ? pageContent.pageId : null,
    groupId: groupContent ? groupContent.groupId : null,
    userId: owner.userId,
  };
  const { isHeLiked, likesNumber, loading, handleAddLikeOrRemoveLike } =
    useLikedUnLikedPost(configLikedUnLiked);

  const { addAssets, openModal, addPostInformation, clearComments } =
    useContext(PostContext);

  const handleAddAssetsToContextAndOpenTheModal = () => {
    addAssets(postContent.assets);
    openModal("a");
    document.body.classList.add("hide__scroll");
  };

  const handleAddInformationAboutPostForGetCommentsAndOpenTheModal = () => {
    clearComments();
    addPostInformation(
      owner,
      postContent,
      groupContent,
      pageContent,
      permission
    );
    openModal("c");
    document.body.classList.add("hide__scroll");
  };

  return (
    <div className={classes.post}>
      <header className={classes.header}>
        <div className={classes["left-info"]}>
          {contentImage}
          <div className={classes.info}>
            {contentName}
            {contentDate}
          </div>
        </div>

        <button className={classes.menu}>
          <CiMenuKebab />
        </button>
      </header>

      <main>
        <button
          className={classes.description}
          onClick={handleToggleText}
          disabled={postContent.description.length < textLimit}
        >
          {displayedText}
        </button>

        {postContent.assets.length < 4 && (
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry gutter="8px">
              {postContent.assets.map((asset) =>
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
        )}

        {postContent.assets.length > 3 && (
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry style={{ position: "relative" }} gutter="8px">
              {postContent.assets.slice(0, 3).map((asset) =>
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

              <div className={classes.more}>
                <img
                  key={postContent.assets[3].public_id}
                  src={postContent.assets[3].link}
                  alt="error"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                  }}
                />

                <div
                  className={classes.overlay}
                  onClick={handleAddAssetsToContextAndOpenTheModal}
                  style={{ cursor: "pointer" }}
                >
                  +{postContent.assets.length - 3} more
                </div>
              </div>
            </Masonry>
          </ResponsiveMasonry>
        )}
      </main>

      <footer className={classes.footer}>
        <div className={classes.likes_comments_number}>
          <div>
            <p>{likesNumber}</p>
            <img src={like} />
          </div>
          <div>
            <p>{postContent.numberOfComments}</p>
            <img src={comment} />
          </div>
        </div>

        <div className={classes.like_comment}>
          <button disabled={loading} onClick={handleAddLikeOrRemoveLike}>
            <img src={isHeLiked ? bigLike : noLike} />
            <p>Love</p>
          </button>
          <button
            onClick={handleAddInformationAboutPostForGetCommentsAndOpenTheModal}
          >
            <img src={bigComment} />
            <p>Comment</p>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Post;
