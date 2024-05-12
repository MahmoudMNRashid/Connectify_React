import classes from "./Forget_Password.module.css";
import forget_password_jpg from "../assets/forget-password.jpg";
import { Input } from "./UI/Input";
import { Link } from "react-router-dom";
import { useInput } from "../hooks/UseInput";
import validator from "validator";
import { useState } from "react";
import toast from "react-hot-toast";
import { host } from "../util/help";
import axios from "axios";

export const Forget_Password = () => {
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

  const disabledTheButton = !emailIsValid;
  const [isLoading, setiIsLoading] = useState(false);

  const handleClickButton = async () => {
    try {
      setiIsLoading(true);
      var toastId = toast.loading("Checking...");

      const response = await axios.post(`${host}/auth/resetPassword`, {
        email: emailValue,
      });
      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message || "Something went wrong", {
        id: toastId,
      });
    }
    setiIsLoading(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes["container--img"]}>
        <img src={forget_password_jpg} alt="forget password" />
      </div>
      <div className={classes["container--forget-password"]}>
        <header className={classes.header}>
          <h2>Forget Password?</h2>
          <p> Enter the email address associated with you account.</p>
        </header>
        <Input
          placeholder="Enter Email Address"
          textError="Invalid email address"
          type="text"
          value={emailValue}
          onChange={(event) => handleEmailChange(event)}
          onBlur={handleEmailBlur}
          hasError={emailHasError}
        />
        <div className={classes["container--naviagation"]}>
          <Link to={".."}>Sign Up</Link>
          <button
            type="button"
            disabled={disabledTheButton || isLoading}
            onClick={handleClickButton}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
