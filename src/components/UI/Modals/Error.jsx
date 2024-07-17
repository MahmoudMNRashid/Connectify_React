import { createPortal } from "react-dom";
import classes from "./Error.module.css";
import { MdHome, MdOutlineCancel } from "react-icons/md";
import { IoIosRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ErrorModal = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.reload();
  };

  const handleMove = () => {
    navigate("/", { replace: true });
  };
  return (
    <>
      <button disabled className={classes.backdrop}></button>

      <div className={classes.wrapper}>
        <div className={classes.header}>
          <button disabled>
            <MdOutlineCancel />
          </button>
        </div>
        <div id="allComments" className={classes.main__content}>
          <p>Something Happen...</p>
          <p>Please Refresh The Page or Move to Home Page</p>
        </div>

        <div className={classes.footer}>
          <button onClick={handleClick}>
            <IoIosRefresh />
          </button>
          <button onClick={handleMove} style={{ backgroundColor: "#C0D6E8" }}>
            <MdHome />
          </button>
        </div>
      </div>
    </>
  );
};

const ErrorModalInstance = () => {
  return createPortal(<ErrorModal />, document.getElementById("modal"));
};

export default ErrorModalInstance;
