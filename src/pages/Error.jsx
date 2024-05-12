import { useLocation } from "react-router-dom";
import ErrorCode from "../components/UI/ErrorCode";

const Error = () => {
  const location = useLocation();
console.log(location.state)
  const status = location.state? location.state.status : 500;
  const message = location.state ? location.state.message : "Error";


  return (
    <div className="center_In_Page">
      <ErrorCode status={status} message={message} />
    </div>
  );
};

export default Error;
