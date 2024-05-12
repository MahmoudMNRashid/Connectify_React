import { useSearchParams } from "react-router-dom";
import { LoginForm } from "../components/Login";
import Signup from "../components/Signup";
import { Toaster } from "react-hot-toast";

export const Auth = () => {
  const [searchParams] = useSearchParams();
  let isLogin = searchParams.get("mode") === "login";
  return (
    <div className="center_In_Page">
      {isLogin && <LoginForm />}
      {!isLogin && <Signup />}
      <Toaster
        toastOptions={{
          success: {
            duration: 7000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
};
