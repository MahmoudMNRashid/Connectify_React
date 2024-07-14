import { useContext } from "react";
import classes from "./TabsMobile.module.css";
import { MainContext } from "../../context/MainContext";
const TabsMobile = ({ tabs, activeTab, setActiveTab }) => {
  const { closeTabsMobile } = useContext(MainContext);
  return (
    <div className={classes.tabs}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${classes.tab} ${
            activeTab === index ? classes.active : ""
          }`}
          onClick={() => {
            setActiveTab(index);
            closeTabsMobile();
            const viewportHeight = window.innerHeight;
            const scrollPosition = viewportHeight * 0.3;
            window.scrollTo({ top: scrollPosition, behavior: "smooth" });
          }}
        >
          <tab.icon />
          <p>{tab.tooltip}</p>
        </div>
      ))}
    </div>
  );
};

export default TabsMobile;
