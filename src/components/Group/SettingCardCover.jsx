import { useState } from "react";
import classes from "./SettingCardCover.module.css";
import FileInput from "../UI/FileInput";
import toast from "react-hot-toast";
import useGroup from "../../hooks/UseGroup";
const SettingCardCover = ({ result }) => {
  const { changeSettings, addCover } = useGroup();
  const [fileInputIsOpen, setFileInputIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCover, setSelectedCover] = useState([]);
  const [error, setError] = useState("");
  const handleOpenFileInputForEdit = () => {
    setFileInputIsOpen(true);
    setEditMode(true);
  };

  const handleAssetsChanges = (event) => {
    setError({});
    setSelectedCover([]);
    const file = event.target.files[0];
    let areAllFilesValid = true;

    // Check if all files are images    or size of any asset not up 10 MB

    const fileType = file.type;

    if (!fileType.startsWith("image")) {
      setError({
        hasError: true,
        errorMessage: "Only images  are allowed.",
      });
    }
    const fileSize = file.size;
    if (fileSize > 10485760) {
      areAllFilesValid = false;
      setError({
        hasError: true,
        errorMessage: "File size exceeds 10 MB",
      });
    }

    if (!areAllFilesValid) {
      return;
    }

    //Check if the user upload more than 1 assets
    if (file.length > 1) {
      setError({
        hasError: true,
        errorMessage: "You can only upload up to 1 files.",
      });
      return;
    }

    const modifyAssets = {
      resource_type: file.type.startsWith("image") ? "image" : "video",
      link: URL.createObjectURL(file),
      public_id: file.name,
      originalFile: file,
    };

    setSelectedCover([modifyAssets]);
  };
  const handleCLoseFileInput = () => {
    setFileInputIsOpen(false);
    setSelectedCover([]);
    if (editMode) {
      setEditMode(false);
    }
  };
  const handleOpenAddMode = () => {
 
    setFileInputIsOpen(true);
    setEditMode(false);
  };
  const handleSave = async () => {
    try {
      if (editMode) {
        await changeSettings(selectedCover[0], "COVER");
      } else {
        await addCover(selectedCover[0]);
      }

      handleCLoseFileInput();
      setSelectedCover([]);
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  return (
    <div className={classes.dataHolder1}>
      {result && (
        <>
          <img src={result.link} />
          <button onClick={handleOpenFileInputForEdit}>Edit cover</button>
        </>
      )}

      {!result && <button onClick={handleOpenAddMode}>Add cover</button>}

      {fileInputIsOpen && (
        <>
          <FileInput
            accept="image/*"
            onChange={handleAssetsChanges}
            hasError={error.hasError}
            errorMessage={error.errorMessage}
          />
          {selectedCover.length > 0 && (
            <div className={classes.actions}>
              <img
                onClick={() => {
                  setSelectedCover([]);
                }}
                style={{ cursor: "pointer" }}
                src={selectedCover[0].link}
              />{" "}
              <div className={classes.buttons}>
                <button
                  onClick={handleSave}
                  disabled={selectedCover.length === 0}
                >
                  Save
                </button>
                <button onClick={handleCLoseFileInput}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SettingCardCover;
