import { useLocation } from "react-router-dom";

import CustomErrorCard from "../components/UI/CustomErrorCard";

const Error = () => {
  const location = useLocation();
  console.log(location.state);
  let status = location.state ? location.state.status : 500;
  let message = location.state ? location.state.message : "Error";
  if (message.includes("Invalid token") || message.includes("invalid token")) {
    status = 403;
  }

  return (
    <div className="center_In_Page">
      <CustomErrorCard status={status} message={message} />
    </div>
  );
};

export default Error;
