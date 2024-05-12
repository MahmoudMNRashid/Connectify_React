import axios from "axios";
import { host } from "../util/help";
import Reset_Password from "../components/Reset_Password";
import  { Toaster } from "react-hot-toast";


const ResetPassword = () => {


  return (
    <div className="center_In_Page">
      <Reset_Password />
      <Toaster />
    </div>
  );
};

export default ResetPassword;

export const loader = async ({ request, params }) => {
  const userId = new URL(request.url).searchParams.get("userId");
  const token = params.token;

  const res = await axios.post(`${host}/auth/checkResetPassword`, {
    token: token,
    userId: userId,
  });
  return res;
};

