import classes from "./SkeletonLoadersMainGroup.module.css";

const SkeletonLoadersMainGroup = () => {
  return (
    <div className={classes.container}>
      <div className={classes.background}></div>

      <div className={classes.info__button}>
        <div className={classes.info}>
          <div className={classes.name}>
            <p></p>
          </div>
          <div className={classes.desc}>
            <p></p>
          </div>
        </div>
        <button></button>
      </div>
    </div>
  );
};

export default SkeletonLoadersMainGroup;
