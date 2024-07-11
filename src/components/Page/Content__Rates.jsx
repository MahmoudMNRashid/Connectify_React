import { useParams } from "react-router-dom";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { getUserId, host } from "../../util/help";
import { PageContext } from "../../context/PageContext";
import { useContext } from "react";
import RateCard from "./RateCard";
import { Loader } from "../UI/Loader";
import { MainContext, content } from "../../context/MainContext";
import EditNameModalInstance from "../UI/Modals/MainModal";

const Content__Rates = () => {
  let { pageId } = useParams();

  const { loading } = useFetchedPost(`${host}/page/rates/${pageId}`, "RATES");
  const { pageRates, pageInformation } = useContext(PageContext);
  const { openModal, modalEditNameIsOpen } = useContext(MainContext);
  const rates = pageRates.rates;
  const avgRate = pageRates.avgRate;
  const canAddRate =
    !rates.find((rate) => rate.from.userId === getUserId()) &&
    !pageInformation.isHeOwner;
  console.log(rates);

  const handleOpenModalAddRate = () => {
    openModal("rate", content.ADD_RATE);
  };
  return (
    <>

      {modalEditNameIsOpen && <EditNameModalInstance />}
      <div className="rate">
        {avgRate!==0 && <p>{`Average :  ${avgRate}`} </p>}
        {canAddRate && (
          <button onClick={handleOpenModalAddRate}>+ Add Rate</button>
        )}
      </div>
      <div className="M_A_M__Content__Container">
        {rates.map((rate) => {
          return <RateCard key={rate.from.userId} data={rate} />;
        })}
        {!loading && rates.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no Rates
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Rates;
