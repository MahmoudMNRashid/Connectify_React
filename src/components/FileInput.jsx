import { FaUpload } from "react-icons/fa6";
import classes from "./FileInput.module.css";
const FileInput = ({
  className,
  hasError,
  errorMessage = "error",
  ...props
}) => {
  
  return (
    
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

  
    
  );
};

export default FileInput;
