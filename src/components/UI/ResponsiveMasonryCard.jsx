import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ResponsiveMasonryCard = ({
  assets,
  columnsCountBreakPoints,
  imageConfig,
  videoConfig,
}) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
      <Masonry gutter="8px">
        {assets.map((file, index) =>
          file.type.startsWith("image") ? (
            <>
              <img
                key={file.name}
                src={URL.createObjectURL(file)}
                alt={file.name}
                onClick={() => imageConfig.onClick(index)}
                style={{ ...imageConfig.style }}
              />
            </>
          ) : (
            <>
              <video
                style={{ ...videoConfig.style }}
                key={file.name}
                controls={videoConfig.showTheControl}
                width="100%"
                onClick={() => videoConfig.onClick(index)}
              >
                <source src={URL.createObjectURL(file)} type="video/mp4" />
              </video>
            </>
          )
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ResponsiveMasonryCard;
