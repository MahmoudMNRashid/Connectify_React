import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import useSearchAll from "../../hooks/UseSearchAll";
import { host } from "../../util/help";
import PageCard from "./PageCard";
import { Loader } from "../UI/Loader";

const PageTab = ({ query, startSearch }) => {
  const { pagesResult } = useContext(MainContext);
  const { loading } = useSearchAll(
    `${host}/profile/searchPages?query=${query}`,
    "PAGE",
    startSearch
  );


  return   <div className="conatiner_results">
  {pagesResult.pages.map((page) => {
    return <PageCard key={page._id} page={page} />;
  })}
  {!loading &&
    pagesResult.pages.length === 0 &&
    pagesResult.firstTime && (
      <p
        style={{
          fontSize: "1rem",
        }}
      >
        No result
      </p>
    )}
  {!loading && !pagesResult.firstTime && <p>Please search</p>}
  {loading && <Loader />}
</div>;
};

export default PageTab;
