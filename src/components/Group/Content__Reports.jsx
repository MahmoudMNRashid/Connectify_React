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
          return (
            <ReportCard
              key={report.reportId }
              data={report}
              isAdmin={false}
            />
          );
        })}
        {!loading && reports.length === 0 && <p className="no">No reports</p>}
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Content__Reports;
