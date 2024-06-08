import { convertDateFormat } from "../util/help";
import classes from "./MiniPost.module.css";
import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import defaultImageGroup from "../assets/post/group_default.jpg";
import defaultImageProfile from "../assets/post/profile_default.svg";
import defaultImagePage from "../assets/post/page_default.svg";
import ResponsiveMasonryCard from "./UI/ResponsiveMasonryCard";

const MiniPost = () => {
  const { postInformation } = useContext(PostContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const textLimit = 300; // Adjust this value as needed for your text length preference

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };
  const displayedText = isExpanded
    ? postInformation.postContent.description
    : postInformation.postContent.description.substring(0, textLimit);

  let contentImage = <div> error post</div>;
  if (
    postInformation.permission.postType === "group" &&
    postInformation.permission.fromAll
  ) {
    contentImage = (
      <div className={classes["container-images"]}>
        <img
          src={
            postInformation.groupContent.cover
              ? postInformation.groupContent.cover.link
              : defaultImageGroup
          }
        />
        <img
          src={
            postInformation.owner.logo
              ? postInformation.owner.logo.asset.link
              : defaultImageProfile
          }
        />
      </div>
    );
  } else if (
    postInformation.permission.postType === "group" &&
    !postInformation.permission.fromAll
  ) {
    contentImage = (
      <img
        src={
          postInformation.owner.logo
            ? postInformation.owner.logo.asset.link
            : defaultImageProfile
        }
      />
    );
  } else if (postInformation.permission.postType === "profile") {
    contentImage = (
      <img
        src={
          postInformation.owner.logo
            ? postInformation.owner.logo.asset.link
            : defaultImageProfile
        }
      />
    );
  } else {
    contentImage = (
      <img
        src={
          postInformation.pageContent.logo
            ? postInformation.pageContent.logo.link
            : defaultImagePage
        }
      />
    );
  }

  const contentName =
    postInformation.permission.postType === "group" ||
    postInformation.permission.postType === "profile" ? (
      <p>
        {postInformation.owner.firsName +
          "   " +
          postInformation.owner.lastName}
      </p>
    ) : (
      <p>{postInformation.pageContent.name}</p>
    );

  let contentDate;
  if (
    postInformation.permission.postType === "group" &&
    postInformation.permission.fromAll
  ) {
    contentDate = (
      <span>
        {postInformation.groupContent.name}

        <span className={`${classes.date} ${classes.DateGroup}`}>
          {convertDateFormat(postInformation.postContent.createdAt)}
        </span>
      </span>
    );
  } else {
    contentDate = (
      <span className={classes.date}>
        {convertDateFormat(postInformation.postContent.createdAt)}
      </span>
    );
  }
  const columnsCountBreakPoints = {
    350: 1,
    750: 2,
    900: 2,
  };
  return (
    <div id="miniPost" className={classes.post}>
      <header className={classes.header}>
        <div className={classes["left-info"]}>
          {contentImage}
          <div className={classes.info}>
            {contentName}
            {contentDate}
          </div>
        </div>
      </header>

      <main>
        <button
          className={classes.description}
          onClick={handleToggleText}
          disabled={postInformation.postContent.description.length < textLimit}
        >
          {displayedText}
        </button>

        {postInformation.postContent.assets.length < 4 && (
          <ResponsiveMasonryCard
            assets={postInformation.postContent.assets}
            columnsCountBreakPoints={columnsCountBreakPoints}
            imageConfig={{
              onClick: () => {},
              style: {},
            }}
            videoConfig={{
              onClick: () => {},
              style: {},
              showTheControl: false,
            }}
          />
        )}

        {postInformation.postContent.assets.length > 3 && (
          <ResponsiveMasonryCard
            assets={postInformation.postContent.assets.slice(0, 3)}
            columnsCountBreakPoints={columnsCountBreakPoints}
            imageConfig={{
              onClick: () => {},
              style: { cursor: "pointer" },
            }}
            videoConfig={{
              onClick: () => {},
              style: { cursor: "pointer" },
              showTheControl: false,
            }}
          >
            {" "}
            <div className={classes.more}>
              <img
                key={postInformation.postContent.assets[3].public_id}
                src={postInformation.postContent.assets[3].link}
                alt="error"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              />

              <div className={classes.overlay}>
                +{postInformation.postContent.assets.length - 3} more
              </div>
            </div>
          </ResponsiveMasonryCard>
        )}
      </main>
    </div>
  );
};

export default MiniPost;
