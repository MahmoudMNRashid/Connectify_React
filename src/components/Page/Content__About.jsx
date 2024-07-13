import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import { extractAndConvertDataProfile } from "../../util/help";
import AboutCard from "./AboutCard";
import { MainContext } from "../../context/MainContext";
import usePage from "../../hooks/UsePage";

const Content__About = () => {
  const { deletePage } = usePage;
  const { pageInformation } = useContext(PageContext);
  const convertedInformation = extractAndConvertDataProfile(pageInformation);
  const { openConfirmModal } = useContext(MainContext);
  const handleDeletePage = () => {
    openConfirmModal(deletePage);
  };
  const isHeOwner = pageInformation.isHeOwner;
  return (
    <>
      <div className="M_A_M__Content__Container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          {convertedInformation.map((info) => {
            return <AboutCard key={info.icon} info={info} />;
          })}
          {isHeOwner && (
            <div className="delete__page">
              <button onClick={handleDeletePage}>Delete the page</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Content__About;
