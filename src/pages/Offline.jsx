import { useContext } from "react";
import offline from "../assets/no internet.svg";
import { MainContext } from "../context/MainContext";
const Offline = () => {
  const { disableIsActive } = useContext(MainContext);
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="offline__container">
      <div>
        <img src={offline} />
        <div>
          {" "}
          <h2>No Internet Connection</h2>
        </div>
        <button disabled={disableIsActive} onClick={handleReload}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Offline;
