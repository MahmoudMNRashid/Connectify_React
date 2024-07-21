import classes from "./Login.module.css";
import logo from "../../assets/logo_transparent.png";
import logo1 from "../../assets/logo-mobile.png";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../UI/Input";
import toast from "react-hot-toast";
import validator from "validator";
import { useInput } from "../../hooks/UseInput";
import axios from "axios";
import { useState } from "react";
import { host } from "../../util/help";
import Cookies from "js-cookie";

export const LoginForm = () => {
  const navigate = useNavigate();
  //handle send load
  const [isLoading, setiIsLoading] = useState(false);

  //handle the inputs with custom hooks
  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: emailHasError,
    valueIsValid: emailIsValid,
  } = useInput(
    "",
    (value) => validator.isEmail(value) && !validator.isEmpty(value)
  );

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: passwordHasError,
    valueIsValid: passwordIsValid,
  } = useInput("", (value) => validator.isLength(value, { min: 6 }));

  //check validation of form for disable the button
  const formIsValid = emailIsValid && passwordIsValid;

  // handle send request
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    try {
      setiIsLoading(true);
      var toastId = toast.loading("Loading...");

      const response = await axios.post(`${host}/auth/login`, {
        email: emailValue,
        password: passwordValue,
      });

      toast.success("done", { id: toastId });

      const token = response.data.token;
      const userId = response.data.userId;
      const firstName = response.data.firstName;
      const lastName = response.data.lastName;
      const logo = response.data.logo;
      const experation = response.data.experation;
      //this for save expire in cookies and after that to compare with expire come from jwt decode
      const date = new Date(experation);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const expireDate = `${year}-${month}-${day} ${hours}:${minutes}`;

      // Get the current date
      let currentDate = new Date();
      // Add 30 days to the current date
      currentDate.setDate(currentDate.getDate() + 30);
      // Format the date as required
      let formattedDate = currentDate.toISOString();

      Cookies.set(
        "Jto__Uid",
        `${token}__&${userId}__&${firstName}__&${lastName}__&${
          logo ? logo.asset.public_id : "undefined"
        }__&${logo ? logo.asset.link : "undefined"}__&${expireDate}`,
        {
          // httpOnly: true,
          // secure: true,
          expires: new Date(formattedDate),
        }
      );
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      if (isLocalhost) {
     
        Cookies.set(
          "Jto__Uid",
          `${token}__&${userId}__&${firstName}__&${lastName}__&${
            logo ? logo.asset.public_id : "undefined"
          }__&${logo ? logo.asset.link : "undefined"}__&${expireDate}`,
          {
            // httpOnly: true,
            // secure: true,
            expires: new Date(formattedDate),
          }
        );
      } else {

        Cookies.set(
          "Jto__Uid",
          `${token}__&${userId}__&${firstName}__&${lastName}__&${
            logo ? logo.asset.public_id : "undefined"
          }__&${logo ? logo.asset.link : "undefined"}__&${expireDate}`,
          {
            httpOnly: true,
            secure: true,
            expires: new Date(formattedDate),
          }
        );
      }
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong", {
        id: toastId,
      });
    }
    setiIsLoading(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes["section--left"]}>
        <img src={logo} />
      </div>

      <div className={classes["section--right"]}>
        <img src={logo1} className={classes["logo--mobile"]} />
        <header className={classes.header}>
          <h2 className={classes["header--title"]}>Log In</h2>
        </header>

        <form
          className={classes.form}
          onSubmit={(event) => handleSubmitForm(event)}
        >
          <Input
            placeholder="Email"
            name="email"
            textError="Invalid email address"
            type="text"
            value={emailValue}
            onChange={(event) => handleEmailChange(event)}
            onBlur={handleEmailBlur}
            hasError={emailHasError}
          />
          <Input
            placeholder="Password"
            name="password"
            textError="Password: min. 6 characters"
            type="password"
            value={passwordValue}
            onChange={(event) => handlePasswordChange(event)}
            onBlur={handlePasswordBlur}
            hasError={passwordHasError}
          />

          <p className={classes.form__text}>
            Forget password!{" "}
            <button
              disabled={isLoading}
              className={classes["button--forget-password"]}
              type="button"
            >
              <Link to={`/auth/forget-password`}>Click Here</Link>
            </button>
          </p>

          <button
            className={classes["button--submit"]}
            disabled={!formIsValid || isLoading}
          >
            Submit
          </button>
        </form>

        <footer className={classes.footer}>
          <p className={classes.form__text}>
            Dont have an account?
            <button
              className={classes["button--signup"]}
              type="button"
              disabled={isLoading}
            >
              <Link to={`?mode=signup`}> Register Here</Link>
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};
