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
          data-tooltip-id="tabss"
          data-tooltip-content={tab.tooltip}
          data-tooltip-place="right"
        >
          <tab.icon />
          <Tooltip
            id="tabss"
            effect="solid"
            variant="light"
            className={classes.tooltip}
            positionStrategy="absolute"
            style={{ position: "absolute", zIndex: 1000 }}
          />
        </div>
      ))}
    </div>
  );
};

export default Tabs;
