import styles from "./SkeletonLoadersMainPage.module.css";
const SkeletonLoadersMainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cover__logo__section}>
        
        
        <div className={styles.cover} />

        <div className={styles.logo}>
          <div />
        </div>
      </div>

      <div className={styles.data__section}>
        <div className={styles.data__button__container}>
          <div className={styles.data__container}>
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
          <div className={styles.button} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadersMainPage;
