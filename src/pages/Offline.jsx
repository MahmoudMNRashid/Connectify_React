import offline from "../assets/No_internet_connection_illustration_concept_vector003_generated.jpg";

const Offline = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="offline__container">
      <div>
        <img src={offline} />
        <button onClick={handleReload}>Try Again</button>
      </div>
    </div>
  );
};

export default Offline;
