import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { convertDateFormat } from "../util/help";
import classes from "./MiniPost.module.css";
import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import defaultImageGroup from "../assets/post/group_default.jpg";
import defaultImageProfile from "../assets/post/profile_default.svg";
import defaultImagePage from "../assets/post/page_default.svg";

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
  if (postInformation.permission.postType === "group" && postInformation.permission.fromAll) {
    contentImage = (
      <div className={classes["container-images"]}>
        <img
          src={postInformation.groupContent.cover ? postInformation.groupContent.cover.link : defaultImageGroup}
        />
        <img
          src={
            postInformation.owner.logo ? postInformation.owner.logo.asset.link : defaultImageProfile
          }
        />
      </div>
    );
  } else if (
    postInformation.permission.postType === "group" &&
    !postInformation.permission.fromAll
  ) {
    contentImage = (
      <img src={postInformation.owner.logo ? postInformation.owner.logo.asset.link : defaultImageProfile} />
    );
  } else if (postInformation.permission.postType === "profile") {
    contentImage = (
      <img src={postInformation.owner.logo ? postInformation.owner.logo.asset.link : defaultImageProfile} />
    );
  } else {
    contentImage = (
      <img src={postInformation.pageContent.logo ? postInformation.pageContent.logo.link : defaultImagePage} />
    );
  }

  const contentName =
  postInformation.permission.postType === "group" || postInformation.permission.postType === "profile" ? (
      <p>{postInformation.owner.firsName + "   " + postInformation.owner.lastName}</p>
    ) : (
      <p>{postInformation.pageContent.name}</p>
    );

  let contentDate;
  if (postInformation.permission.postType === "group" && postInformation.permission.fromAll) {
    contentDate = (
      <pre>
        {postInformation.groupContent.name}
        {`  `}
        <span className={classes.date}>
          {convertDateFormat(postInformation.postContent.createdAt)}
        </span>
      </pre>
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
    <div className={classes.post}>
    {/* <h2 className={classes.title}>Post content</h2> */}
      <header className={classes.header}>
        <div className={classes["left-info"]}>
          {contentImage}
          <div className={classes.info}>
            {contentName}
            {contentDate}
          </div>
        </div>

        {/* <button className={classes.menu}>
          <CiMenuKebab />
        </button> */}
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
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry gutter="8px">
              {postInformation.postContent.assets.map((asset) =>
                asset.resource_type === "image" ? (
                  <img key={asset.public_id} src={asset.link} alt="error" />
                ) : (
                  <video key={asset.public_id} controls width="100%">
                    <source src={asset.link} type="video/mp4" />
                  </video>
                )
              )}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {postInformation.postContent.assets.length > 3 && (
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry style={{ position: "relative" }} gutter="8px">
              {postInformation.postContent.assets.slice(0, 3).map((asset) =>
                asset.resource_type === "image" ? (
                  <img key={asset.public_id} src={asset.link} alt="error" />
                ) : (
                  <video key={asset.public_id} controls width="100%">
                    <source src={asset.link} type="video/mp4" />
                  </video>
                )
              )}

              <div className={classes.more}>
                <img
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
            </Masonry>
          </ResponsiveMasonry>
        )}
      </main>

    
    </div>
  );
};

export default MiniPost;
