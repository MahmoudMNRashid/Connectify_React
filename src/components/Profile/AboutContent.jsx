import { useContext } from "react";
import InfoCard from "./InfoCard";
import { ProfileContext } from "../../context/ProfileContext";
import { extractAndConvertDataProfile } from "../../util/help";

const AboutContent = () => {
  const { mainInformation } = useContext(ProfileContext);

  const convertedInformation = extractAndConvertDataProfile(mainInformation);

  return (
    <div className="container__profile">
      <div style={{display:'flex', flexWrap:'wrap', gap:'2rem',justifyContent:'center',margin:'1rem'}}>
        {convertedInformation.map((info) => {
          return info ? <InfoCard key={info.icon} info={info} /> : null;
        })}
      </div>
    </div>
  );
};

export default AboutContent;
