import { useState } from "react";
import style from "./Input.module.css";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";

export const Input = ({
  placeholder = "",
  textError = "error",
  type = "text",
  hasError,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const b = type;
  if (type === "password") {
    type = isHidden ? "password" : "text";
  }

  const icon = isHidden ? <GrFormViewHide /> : <GrFormView />;
  const classes = hasError ? style.invalid : "";
  
  const buttpnStyleWhenError = hasError ? style["invalid-button"] : "";
  const HandleShowPassword = () => {
    setIsHidden((prev) => !prev);
  };
  return (
    <div className={style["input-container"]}>
      <input
        className={`${classes} ${style.input}`}
        type={type}
        placeholder={placeholder}
        {...props}
      />
      {hasError && <p className={style["text--invalid"]}> {textError} </p>}
      {b === "password" && (
        <button
          className={`${style["button--password-icon"]} ${buttpnStyleWhenError}`}
          type="button"
          onClick={HandleShowPassword}
        >
          {icon}
        </button>
      )}
    </div>
  );
};
