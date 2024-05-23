import { useContext } from "react";
import InfoCard from "./InfoCard";
import { ProfileContext } from "../../context/ProfileContext";
import { extractAndConvertDataProfile } from "../../util/help";

const AboutContent = () => {
  const { mainInformation } = useContext(ProfileContext);

  const convertedInformation = extractAndConvertDataProfile(mainInformation);
console.log(convertedInformation)
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
          } else if ((info.name!==''&&info.desc!=='Email') && !mainInformation.isHeOwner) {
            return <InfoCard key={info.icon} info={info} />;
          }
        })}
      </div>
    </div>
  );
};

export default AboutContent;
