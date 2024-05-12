import { useRouteError } from "react-router-dom";
import Error403 from "../components/403";

const ErrorPage = () => {
  const error = useRouteError();

  const status = error.response.status || 404;
  return (
    <div className="center_In_Page">
      {status === 403 && <Error403 />}
      {status === 404 && <Error403 />}
    </div>
  );
};

export default ErrorPage;
