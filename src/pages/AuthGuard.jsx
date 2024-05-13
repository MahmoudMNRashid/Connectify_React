
import { getToken } from "../util/help";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isAuth = getToken() ? true : false;
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default AuthGuard;
