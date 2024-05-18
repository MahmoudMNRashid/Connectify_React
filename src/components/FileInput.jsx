import { FaUpload } from "react-icons/fa6";
import classes from "./FileInput.module.css";
const FileInput = ({
  className,
  hasError,
  errorMessage = "error",
  ...props
}) => {
  const [selectedAssets, setSelectedAssets] = useState([]);

  const handleRemoveAsset = (index) => {
    setSelectedAssets((prevAssets) =>
      prevAssets.filter((file, i) => i !== index)
    );
  };
  const handleAssetsChanges = (event) => {
    setError({});
    setSelectedAssets([]);
    const files = event.target.files;
    let areAllFilesValid = true;

    // Check if all files are images or videos   or size of any asset not up 10 MB
    Array.from(files).forEach((file) => {
      const fileType = file.type;
      if (!fileType.startsWith("image") && !fileType.startsWith("video")) {
        setError({
          hasError: true,
          errorMessage: "Only images and videos are allowed.",
        });
      }

      if (file.size > 10485760) {
        areAllFilesValid = false;
        setError({
          hasError: true,
          errorMessage: "File size exceeds 10 MB",
        });
      }
    });

    if (!areAllFilesValid) {
      return;
    }

    //Check if the user upload more than 5 assets
    if (files.length > 5) {
      setError({
        hasError: true,
        errorMessage: "You can only upload up to 5 files.",
      });
      return;
    }

    const modifyAssets = Array.from(files).map((file) => {
      return {
        resource_type: file.type.startsWith("image") ? "image" : "video",
        link: URL.createObjectURL(file),
        public_id: file.name,
        originalFile: file,
      };
    });

    setSelectedAssets(modifyAssets);
  };
  const columnsCountBreakPoints = {
    350: 5,
    750: 5,
    900: 5,
  };
  return (
    <>
      <div className={classes.input__wrapper}>
        <input
          type="file"
          name="file"
          id="file"
          className={`${classes.inputfile} ${className} `}
          {...props}
        />
        <label htmlFor="file">
          {" "}
          <FaUpload /> Choose an assets
        </label>

        {hasError && <p>{errorMessage}</p>}
      </div>

      {selectedAssets.length > 0 && (
          <ResponsiveMasonryCard
            assets={selectedAssets}
            columnsCountBreakPoints={columnsCountBreakPoints}
            imageConfig={{
              onClick: handleRemoveAsset,
              style: { cursor: "pointer" },
            }}
            videoConfig={{
              onClick: handleRemoveAsset,
              style: { cursor: "pointer" },
              showTheControl: false,
            }}
          />
        )}
    </>
  );
};

export default FileInput;
