import { useContext } from "react";
import InfoCard from "./InfoCard";
import { ProfileContext } from "../../context/ProfileContext";
import { extractAndConvertDataProfile } from "../../util/help";
import { MainContext } from "../../context/MainContext";
import useProfile from "../../hooks/UseProfile";

const AboutContent = () => {
  const { mainInformation } = useContext(ProfileContext);
  const isHeOwner = mainInformation.isHeOwner;
  const { deleteAccount } = useProfile();
  const convertedInformation = extractAndConvertDataProfile(mainInformation);
  const { openConfirmModal } = useContext(MainContext);
  const handleDeletePage = () => {
    openConfirmModal(deleteAccount);
  };
  return (
    <div className="container__profile">
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
          if (mainInformation.isHeOwner) {
            return <InfoCard key={info.icon} info={info} />;
          } else if (
            info.name !== "" &&
            info.desc !== "Email" &&
            !mainInformation.isHeOwner
          ) {
            return <InfoCard key={info.icon} info={info} />;
          }
        })}
        {isHeOwner && (
          <div className="delete__page">
            <button onClick={handleDeletePage}>Delete My account</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutContent;
