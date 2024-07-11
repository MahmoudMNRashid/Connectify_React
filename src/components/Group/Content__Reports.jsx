import { useParams } from "react-router-dom";
import ReportCard from "./ReportCard";
import useFetchedPost from "../../hooks/UseFetchedPost";
import { host } from "../../util/help";
import { useContext } from "react";
import { GroupContext } from "../../context/GroupContext";
import { Loader } from "../UI/Loader";

const Content__Reports = () => {
  let { groupId } = useParams();

  const { loading } = useFetchedPost(
    `${host}/group/reports/${groupId}`,
    "REPORTS"
  );
  const { groupReports } = useContext(GroupContext);

  const reports = groupReports.reports;

  return (
    <>
      <div className="M_A_M__Content__Container">
        {reports.map((report) => {
         
          return <ReportCard key={report.reportId||crypto.randomUUID()} data={report} />;
        })}
        {!loading && reports.length === 0 && (
          <p
            style={{
              fontSize: "2rem",
              padding: "2.5rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            There are no reports
          </p>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Reports;
