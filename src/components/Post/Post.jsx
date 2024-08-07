import { useContext, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import classes from "./Post.module.css";
import like from "../../assets/small-like.svg";
import noLike from "../../assets/big-no-like.svg";
import bigLike from "../../assets/big-like-green.svg";
import bigComment from "../../assets/big-comment.svg";
import comment from "../../assets/small-comment.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import defaultImageGroup from "../../assets/post/group_default.jpg";
import defaultImageProfile from "../../assets/post/profile_default.svg";
import defaultImagePage from "../../assets/post/page_default.svg";
import useLikedUnLikedPost from "../../hooks/UseLikedUnlikedPost.js";
import { PostContext } from "../../context/PostContext.jsx";
import { convertDateFormat } from "../../util/help.js";
import { useNavigate } from "react-router-dom";
import { MdBlockFlipped, MdDelete, MdEdit, MdReport } from "react-icons/md";
import usePost from "../../hooks/UsePost.js";
import { MainContext, content } from "../../context/MainContext.jsx";

const Post = ({ data, place, hideMenu }) => {
  //Hooks
  console.log(data)
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
    canDelete: data.canDelete,
    canUpdate: data.canUpdate,
    canReport: data.canReport ? data.canReport : null,
    canBlocked: data.canBlock ? data.canBlock : null,
    isHeOwnerOfPost: data.isHeOwnerOfPost,
    canCommentOrLike:
      "canCommentOrLike" in data
        ? data.canCommentOrLike
        : "canCommentOrLike" in postContent
        ? postContent.canCommentOrLike
        : true,
  };

  //Functions

  const handleMoveToGroup = () => {
    navigate(`/group/${groupContent.groupId}`);
  };
  const handleMoveToPage = () => {
    navigate(`/page/${pageContent.pageId}`);
  };
  const handleMoveToProfile = () => {
    navigate(`/profile/${owner.userId}`);
  };
  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedText = isExpanded
    ? postContent.description
    : postContent.description?.substring(0, textLimit);

  let contentImage = <div> error post</div>;
  if (permission.postType === "group" && permission.fromAll) {
    contentImage = (
      <div className={classes["container-images"]}>
        <img
          onClick={handleMoveToGroup}
          src={groupContent.cover ? groupContent.cover.link : defaultImageGroup}
        />
        <img
          onClick={handleMoveToProfile}
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
      <img
        onClick={handleMoveToProfile}
        src={owner.logo ? owner.logo.asset.link : defaultImageProfile}
      />
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
      <p onClick={handleMoveToProfile}>
        {owner.firstName + "   " + owner.lastName}
      </p>
    ) : (
      <p onClick={handleMoveToPage}>{pageContent.name}</p>
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
    900: postContent.assets?.length === 1 ? 1 : 2,
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

  const { openModal: openMainModal, disableIsActive } = useContext(MainContext);
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

  const [showMenu, setShowMenu] = useState(false);

  const { deletePost } = usePost();

  const handleDeletePost = () => {
    deletePost(
      permission.postType,
      postContent._idPost,
      pageContent?.pageId,
      groupContent?.groupId,
      place
    );
  };

  const openEditPostModal = () => {
    addPostInformation(
      owner,
      postContent,
      groupContent,
      pageContent,
      permission,
      place
    );
    openMainModal("post", content.EDIT_POST);
  };
  const openAddReportModal = () => {
    addPostInformation(
      owner,
      postContent,
      groupContent,
      pageContent,
      permission,
      place
    );
    openMainModal("report", content.ADD_REPORT);
  };

  const openBLockMemberModal = () => {
    addPostInformation(
      owner,
      postContent,
      groupContent,
      pageContent,
      permission,
      place
    );
    openMainModal("member", content.BLOCK_MEMBER);
  };
  const openLikersModal = () => {
    addPostInformation(
      owner,
      postContent,
      groupContent,
      pageContent,
      permission,
      place
    );
    openMainModal("post", content.LIKES);
  };

  const canShowMenuButton =
    permission.canBlocked ||
    permission.canDelete ||
    permission.canUpdate ||
    permission.canReport;
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

        {canShowMenuButton && !hideMenu && (
          <div
            className={classes.menu}
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          >
            <CiMenuKebab />
            {showMenu && (
              <ul className={classes.options}>
                {permission.canDelete && (
                  <li onClick={handleDeletePost}>
                    <MdDelete /> Delete
                  </li>
                )}
                {permission.canUpdate && (
                  <li onClick={openEditPostModal}>
                    <MdEdit /> Edit
                  </li>
                )}
                {permission.canReport && (
                  <li onClick={openAddReportModal}>
                    <MdReport />
                    Report
                  </li>
                )}
                {permission.canBlocked && (
                  <li onClick={openBLockMemberModal}>
                    <MdBlockFlipped />
                    Block
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </header>

      <main>
        <button
          className={classes.description}
          onClick={handleToggleText}
          disabled={postContent.description?.length < textLimit}
        >
          {displayedText}
        </button>

        {postContent.assets?.length < 4 && (
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

        {postContent.assets?.length > 3 && (
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
                  +{postContent.assets?.length - 3} more
                </div>
              </div>
            </Masonry>
          </ResponsiveMasonry>
        )}
      </main>

      <footer className={classes.footer}>
        <div className={classes.likes_comments_number}>
          <div onClick={openLikersModal}>
            <p>{likesNumber}</p>
            <img src={like} />
          </div>
          <div>
            <p>{postContent.numberOfComments}</p>
            <img
              src={comment}
              onClick={
                handleAddInformationAboutPostForGetCommentsAndOpenTheModal
              }
            />
          </div>
        </div>

        {permission.canCommentOrLike && (
          <div className={classes.like_comment}>
            <button
              disabled={loading || disableIsActive}
              onClick={handleAddLikeOrRemoveLike}
            >
              <img src={isHeLiked ? bigLike : noLike} />
              <p>Love</p>
            </button>
            <button
              disabled={disableIsActive}
              onClick={
                handleAddInformationAboutPostForGetCommentsAndOpenTheModal
              }
            >
              <img src={bigComment} />
              <p>Comment</p>
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

export default Post;
