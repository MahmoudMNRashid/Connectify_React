import { useContext } from "react";
import offline from "../assets/No_internet_connection_illustration_concept_vector003_generated.jpg";
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
        <button disabled={disableIsActive} onClick={handleReload}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Offline;
