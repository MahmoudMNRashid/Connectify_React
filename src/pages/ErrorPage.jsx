import { useRouteError } from "react-router-dom";
import Error403 from "../components/403";

const ErrorPage = () => {
  const error = useRouteError();
console.log(error)
  const status = error.response.status || 500;
  console.log(status)
  return (
    <div className="center_In_Page">
      {status === 403 && <Error403 status />}
      {status === 404 && <Error403 />}
      {status === 422 && <Error403 />}
    </div>
  );
};

export default ErrorPage;
