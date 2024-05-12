import classes from "./Checkbox.module.css";

export const Checkbox = ({ src, ...props }) => {

  return (
    <label className={classes.label}>
      <input type="checkbox" {...props} />
      <span><img src={src}/></span>
      
    </label>
  );
};
