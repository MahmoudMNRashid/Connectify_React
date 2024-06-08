import classes from "./Tabs.module.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className={classes.tabs}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${classes.tab} ${
            activeTab === index ? classes.active : ""
          }`}
          onClick={() => setActiveTab(index)}
          data-tooltip-id="tt"
          data-tooltip-content={tab.tooltip}
          data-tooltip-place="right"
        >
          
          <tab.icon />
          <Tooltip id="tt" effect="solid" variant="light" className={classes.tooltip}  />
        </div>
      ))}
    </div>
  );
};

export default Tabs;
