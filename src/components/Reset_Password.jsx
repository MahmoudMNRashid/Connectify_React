import classes from "./Reset_Password.module.css";
import { Input } from "./UI/Input";
import reset_password from "../assets/reset_password.jpg";
import { useInput } from "../hooks/UseInput";
import validator from "validator";
import { useState } from "react";
import { host } from "../util/help";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Reset_Password = () => {
  const [isLoading, setiIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const passwordInformation = useInput("", (value) =>
    validator.matches(
      value,
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&|*-_]{6,}$/
    )
  );

  const confirmPasswordInformation = useInput("", (value) =>
    validator.equals(value, passwordInformation.value)
  );

  let { token } = useParams();
  
  let [searchParams] = useSearchParams();

  const disabledTheButton =
    !passwordInformation.valueIsValid ||
    !confirmPasswordInformation.valueIsValid;

  const handleClickResetButton = async () => {
    try {
      setiIsLoading(true);
      var toastId = toast.loading("Checking...");
      const response = await axios.put(`${host}/auth/newPassword`, {
        userId: searchParams.get("userId"),
        token: token,
        newPassword: passwordInformation.value,
      });
      navigate(`/auth?mode=login`, { replace: true });
      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message || "Something went wrong", {
        id: toastId,
      });
    }
    setiIsLoading(false);
  };
  
  return (
    <div className={classes.container}>
      <div className={classes["container--img"]}>
        <img src={reset_password} alt="forget password" />
      </div>
      <div className={classes["container--forget-password"]}>
        <header className={classes.header}>
          <h2>Reset The Password?</h2>
          <p> Enter the new password for your account.</p>
        </header>
        <div className={classes["container--inputs"]}>
          <Input
            placeholder="Password"
            textError="Password: min. 6 characters with 1 letter, 1 number, 1 special character"
            type="password"
            value={passwordInformation.value}
            onChange={(event) => passwordInformation.handleInputChange(event)}
            onBlur={passwordInformation.handleInputBlur}
            hasError={passwordInformation.hasError}
          />
          <Input
            placeholder="Confirm Password"
            textError="Passwords do not match"
            type="password"
            value={confirmPasswordInformation.value}
            onChange={(event) =>
              confirmPasswordInformation.handleInputChange(event)
            }
            onBlur={confirmPasswordInformation.handleInputBlur}
            hasError={confirmPasswordInformation.hasError}
          />
        </div>
        <div className={classes["container--naviagation"]}>
          <button
            type="button"
            disabled={disabledTheButton || isLoading}
            onClick={handleClickResetButton}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reset_Password;
