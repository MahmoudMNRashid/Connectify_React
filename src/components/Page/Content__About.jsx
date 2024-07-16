import { useContext } from "react";
import { PageContext } from "../../context/PageContext";
import { extractAndConvertDataProfile } from "../../util/help";
import AboutCard from "./AboutCard";


const Content__About = () => {

  const { pageInformation } = useContext(PageContext);
  const convertedInformation = extractAndConvertDataProfile(pageInformation);

 
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
         
        </div>
      </div>
    </>
  );
};

export default Content__About;
