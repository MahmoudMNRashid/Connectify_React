import { jwtDecode } from "jwt-decode";
import { clearCookies, getExpireDate, getToken, getUserId } from "../util/help";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isAuth = getToken() ? true : false;
  if (!isAuth) {
    clearCookies();
    return <Navigate to="/auth" replace />;
  }

  const decoded = jwtDecode(getToken());

  const userId = decoded.userId;
  if (userId !== getUserId() || !userId) {
    clearCookies();
    return <Navigate to="/auth" replace />;
  }
  const role = decoded.role;
  if (role !== "user" || !role) {
    clearCookies();
    return <Navigate to="/auth" replace />;
  }

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    clearCookies();
    return <Navigate to="/auth" replace />;
  }

  const date = new Date(decoded.exp * 1000);
  // JWT exp is in seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const expireDateFromJWT = `${year}-${month}-${day} ${hours}:${minutes}`;

  if (expireDateFromJWT !== getExpireDate()) {
    clearCookies();
    return <Navigate to="/auth" replace />;
  }


  return children;
};

export default AuthGuard;
