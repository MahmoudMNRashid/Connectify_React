import { Fragment } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ResponsiveMasonryCard = ({
  assets,
  columnsCountBreakPoints,
  imageConfig,
  videoConfig,
  children
}) => {
console.log(assets)
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
      <Masonry gutter="8px">
        {assets.map((file, index) =>
          file.resource_type === "image" ? (
            <Fragment key={file.link}>
              <img
                key={file.public_id}
                src={file.link}
                alt={"image"}
                onClick={() => imageConfig.onClick(index)}
                style={{ ...imageConfig.style }}
              />
             
            </Fragment>
          ) : (
            <Fragment key={file.link}>
              <video
                style={{ ...videoConfig.style }}
                key={file.public_id}
                controls={videoConfig.showTheControl}
                width="100%"
                onClick={() => videoConfig.onClick(index)}
              >
                <source src={file.link} type="video/mp4" />
              </video>
            </Fragment>
          )
        )}
        {children}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ResponsiveMasonryCard;
