import axios from "axios";
import { host } from "../util/help";
import Reset_Password from "../components/Auth/Reset_Password";
import { Toaster } from "react-hot-toast";

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
  console.log(userId, token);

  const res = await axios.post(`${host}/auth/checkResetPassword`, {
    token: token,
    userId: userId,
  });
  console.log(res);
  return res;
};
