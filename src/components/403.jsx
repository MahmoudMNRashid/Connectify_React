import classes from "./403.module.css";
import _403 from "../assets/Errors/403.jpg";
import { Link } from "react-router-dom";
const Error403 = () => {
  return (
    <div className={classes.container}>
      <section className={classes["section--left"]}>
        <img src={_403} />
      </section>
      <section className={classes["section--right"]}>
        <h2> We are sorry</h2>
        <p>you lack permissions to access this page.</p>
        <Link to={'/auth'}  replace>Go to the main page</Link>
      </section>
    </div>
  );
};

export default Error403;
