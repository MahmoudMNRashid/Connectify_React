import classes from "./403.module.css";
import _403 from "../assets/Errors/403.jpg";
import _404 from "../assets/Errors/404.jpg";
import _500 from "../assets/Errors/401.svg";
import _401 from "../assets/Errors/500.svg";
import { Link } from "react-router-dom";
const Error403 = ({ status }) => {
  let error;
  if (status === 403) {
    error = _403;
  } else if (status === 404) {
    error = _404;
  } else if (status === 401) {
    error = _401;
  } else if (status === 500) {
    error = _500;
  } else {
    error = _403;
  }

  return (
    <div className={classes.container}>
      <section className={classes["section--left"]}>
        <img src={error} />
      </section>
      <section className={classes["section--right"]}>
        <h2> We are sorry</h2>
        <p>you lack permissions to access this page.</p>
        <Link to={"/auth"} replace>
          Go to the main page
        </Link>
      </section>
    </div>
  );
};

export default Error403;
