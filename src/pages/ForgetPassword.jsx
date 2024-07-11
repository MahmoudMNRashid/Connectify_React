import { Toaster } from "react-hot-toast";
import { Forget_Password } from "../components/Auth/Forget_Password";

export const ForgetPassword = () => {
  return (
    
    <div style={{ backgroundColor: "#eeeff4" }} className="center_In_Page">
      <Forget_Password/>
      <Toaster toastOptions={{
          success: {
            duration: 7000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}/>
    </div>
   
  );
};
