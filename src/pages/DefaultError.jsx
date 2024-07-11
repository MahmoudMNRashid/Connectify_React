import { useRouteError } from "react-router-dom";
import DefaultErrorCard from "../components/UI/DefaultErrorCard";

const ErrorPage = () => {
  const error = useRouteError();

  let status = error.response?.status || 500;
let message = error.response?.message ||'Something went wrong'
  if (
    error.toString().includes("Invalid token") ||
    error.toString().includes("invalid token") ||
    error.toString().includes("jwt")
  ) {
    status = 401;
  }
 
  return (
    <div className="center_In_Page">
      <DefaultErrorCard status={status} message={message} />
    </div>
  );
};

export default ErrorPage;
