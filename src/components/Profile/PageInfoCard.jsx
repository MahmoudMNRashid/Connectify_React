import classes from "./PageInfoCard.module.css";
import defaultPage from "../../assets/post/page_default.svg";

const PageInfoCard = ({ page }) => {
  console.log(page);
  const logoPage =
    page.logo && page.logo.link
      ? page.logo.link
      : defaultPage;

  const name = page.name;
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.img}>
          <img src={logoPage} />
        </div>
        <p> {name}</p>
      </div>

      <div className={classes.right}>
        <button>Visit</button>
      </div>
    </div>
  );
};

export default PageInfoCard;
