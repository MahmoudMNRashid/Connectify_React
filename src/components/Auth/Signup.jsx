import { Link } from "react-router-dom";
import { useInput } from "../../hooks/UseInput";
import validator from "validator";
import { Input } from "../UI/Input";
import style from "./SignUp.module.css";
import logo from "../../assets/logo_transparent.png";
import logo1 from "../../assets/logo-mobile.png";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import { useState } from "react";

import { Checkbox } from "../UI/Checkbox";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../../util/help";

const Signup = () => {
  const {
    value: firstNameValue,
    handleInputBlur: handleFirstNameBlur,
    handleInputChange: handleFirstNameChange,
    hasError: firstNameHasError,
    valueIsValid: firstNameIsValid,
  } = useInput(
    "",
    (value) => validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
  );

  const lastNameInformation = useInput(
    "",
    (value) => validator.isLength(value, { min: 3 }) && validator.isAlpha(value)
  );

  const emailInformation = useInput("", (value) => validator.isEmail(value));

  const passwordInformation = useInput("", (value) =>
    validator.isLength(
      value,
      { min:6 }
    )
  );

  const confirmPasswordInformation = useInput("", (value) =>
    validator.equals(value, passwordInformation.value)
  );

  const birthDateInformation = useInput("", (value) => {
    const birthday = new Date(value);
    const currentDate = new Date();

    // Calculate age
    const age = Math.floor(
      (currentDate - birthday) / (365.25 * 24 * 60 * 60 * 1000)
    );

    // Check if age is 8 or older
    if (age >= 8) {
      return true;
    }
    return false;
  });

  const [checkedGender, setCheckedGender] = useState({
    male: false,
    female: false,
  });

  const handleChangeCheckedGender = (gender) => {
    if (gender === "male") {
      setCheckedGender((prev) => {
        let oldChecked = { ...prev };
        oldChecked.male = !oldChecked.male;
        oldChecked.female = false;
        return oldChecked;
      });
    } else if (gender === "female") {
      setCheckedGender((prev) => {
        let oldChecked = { ...prev };
        oldChecked.male = false;
        oldChecked.female = !oldChecked.female;
        return oldChecked;
      });
    }
  };

  //check validation of form for disable the button
  const formIsValid =
    firstNameIsValid &&
    lastNameInformation.valueIsValid &&
    emailInformation.valueIsValid &&
    passwordInformation.valueIsValid &&
    confirmPasswordInformation.valueIsValid &&
    birthDateInformation.valueIsValid &&
    (checkedGender.male || checkedGender.female);

  const [isLoading, setiIsLoading] = useState(false);
  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    try {
      setiIsLoading(true);
      var toastId = toast.loading("Loading...");
      const response = await axios.put(`${host}/auth/signup`, {
        firstName: firstNameValue,
        lastName: lastNameInformation.value,
        email: emailInformation.value,
        password: passwordInformation.value,
        gender: checkedGender.male ? "male" : "female",
        confirmPassword: confirmPasswordInformation.value,
        birthDay: birthDateInformation.value,
      });
      toast.success(response.data.message, { id: toastId });
    } catch (error) {
      
      toast.error(error.response.data.message || "Something went wrong", {
        id: toastId,
      });
    }
    setiIsLoading(false);
  };
 
  return (
    <div className={style.container}>
      <section className={style["section--left"]}>
        <img src={logo} />
      </section>
      <section className={style["section--right"]}>
        <img src={logo1} className={style["logo--mobile"]} />
        <header className={style.header}>
          <h2 className={style["header--title"]}>Sign Up</h2>
        </header>
        <main>
          <form
            className={style.form}
            onSubmit={(event) => handleSubmitForm(event)}
          >
            <div className={style.container__inputs}>
              <Input
                placeholder="First Name"
                textError="First name: min. 3 characters, no numbers."
                type="text"
                value={firstNameValue}
                onChange={(event) => handleFirstNameChange(event)}
                onBlur={handleFirstNameBlur}
                hasError={firstNameHasError}
              />
              <Input
                placeholder="Last Name"
                textError="Last name: min. 3 characters, no numbers."
                type="text"
                value={lastNameInformation.value}
                onChange={(event) =>
                  lastNameInformation.handleInputChange(event)
                }
                onBlur={lastNameInformation.handleInputBlur}
                hasError={lastNameInformation.hasError}
              />
            </div>

            <Input
              placeholder="Email"
              textError="Invalid email address"
              type="text"
              value={emailInformation.value}
              onChange={(event) => emailInformation.handleInputChange(event)}
              onBlur={emailInformation.handleInputBlur}
              hasError={emailInformation.hasError}
            />
            <div className={style.container__inputs}>
              <Input
                placeholder="Password"
                textError="Password: min. 6 characters "
                type="password"
                value={passwordInformation.value}
                onChange={(event) =>
                  passwordInformation.handleInputChange(event)
                }
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
            <Input
              placeholder="Birth Date"
              textError="Minimum age: 8 years old"
              type="date"
              value={birthDateInformation.value}
              onChange={(event) =>
                birthDateInformation.handleInputChange(event)
              }
              onBlur={birthDateInformation.handleInputBlur}
              hasError={birthDateInformation.hasError}
            />

            <div className={style.container__inputs}>
              <Checkbox
                src={male}
                checked={checkedGender.male}
                onChange={() => handleChangeCheckedGender("male")}
              />
              <Checkbox
                src={female}
                checked={checkedGender.female}
                onChange={() => handleChangeCheckedGender("female")}
              />
            </div>

            <button
              disabled={!formIsValid || isLoading}
              className={style["button--submit"]}
            >
              Sign Up
            </button>
          </form>
        </main>
        <footer className={style.footer}>
          <p>
            {" "}
            Already have an account?<Link to={`?mode=login`}>Enter</Link>
          </p>
        </footer>
      </section>
    </div>
  );
};

export default Signup;
