import classes from "./Textarea.module.css";
const Textarea = ({ placeholder, hasError, textError, ...props }) => {
  return (
    <div className={classes.container}>
      <textarea placeholder={placeholder} {...props} />
      {hasError && <p className={classes["text--invalid"]}> {textError} </p>}
    </div>
  );
};

export default Textarea;
