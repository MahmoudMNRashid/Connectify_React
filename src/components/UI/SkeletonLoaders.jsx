import classes from "./SkeletonLoaders.module.css";
const SkeletonLoaders = () => {
  return (
    <div className={classes.skeleton}>
      <div className={`${classes.flex1} ${classes["skeleton-left"]}`}>
        <div className={classes.square} />
      </div>
      <div className={`${classes["skeleton-right"]} ${classes.flex2}`}>
        <div
          className={`${classes.line} ${classes.h17} ${classes.w40} ${classes.m10}`}
        />
        <div className={classes.line} />
        <div className={`${classes.line} ${classes.h8} ${classes.w50} `} />
        <div className={`${classes.w75} ${classes.line} `} />
      </div>
    </div>
  );
};

export default SkeletonLoaders;
