import { useState } from "react";
import ResponsiveMasonryCard from "../UI/ResponsiveMasonryCard";
import classes from "./MiniPostGroup.module.css";
import { convertDateFormat, getFullName, getLogo } from "../../util/help";

import defaultImageProfile from "../../assets/post/profile_default.svg";
const MiniPostGroup = ({ post, your }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textLimit = 300; // Adjust this value as needed for your text length preference

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };
  const displayedText = isExpanded
    ? post.postContent.description
    : post.postContent.description.substring(0, textLimit);

  const columnsCountBreakPoints = {
    350: 1,
    750: 2,
    900: 2,
  };

  const yourLogo = getLogo();
  console.log(yourLogo);
  return (
    <div id="miniPost" className={classes.post}>
      <header className={classes.header}>
        <div className={classes["left-info"]}>
          <div className={classes["container-images"]}>
            {!your && (
              <img
                src={
                  post.owner.logo
                    ? post.owner.logo.asset.link
                    : defaultImageProfile
                }
              />
            )}
            {your && (
              <img
                src={
                  yourLogo.asset.link !== "undefined"
                    ? yourLogo.asset.link
                    : defaultImageProfile
                }
              />
            )}
          </div>
          <div className={classes.info}>
            {!your && (
              <p>{post.owner.firsName + "   " + post.owner.lastName}</p>
            )}
            {your && <p>{getFullName()}</p>}
            <span className={classes.date}>
              {convertDateFormat(post.postContent.createdAt)}
            </span>
          </div>
        </div>
      </header>

      <main>
        <button
          className={classes.description}
          onClick={handleToggleText}
          disabled={post.postContent.description.length < textLimit}
        >
          {displayedText}
        </button>

        {post.postContent.assets.length < 4 && (
          <ResponsiveMasonryCard
            assets={post.postContent.assets}
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

        {post.postContent.assets.length > 3 && (
          <ResponsiveMasonryCard
            assets={post.postContent.assets.slice(0, 3)}
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
                key={post.postContent.assets[3].public_id}
                src={post.postContent.assets[3].link}
                alt="error"
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                }}
              />

              <div className={classes.overlay}>
                +{post.postContent.assets.length - 3} more
              </div>
            </div>
          </ResponsiveMasonryCard>
        )}
      </main>
    </div>
  );
};

export default MiniPostGroup;
