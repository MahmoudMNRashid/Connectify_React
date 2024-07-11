import style from "./CustomErrorCard.module.css";
import _500 from "../../assets/Errors/500.svg";
import _401 from "../../assets/Errors/401.svg";
import _403 from "../../assets/Errors/403.jpg";
import { useNavigate } from "react-router-dom";
const CustomErrorCard = ({ status, message }) => {
  const navigate = useNavigate();
  const src =
    status === 500
      ? _500
      : status === 401
      ? _401
      : status === 403
      ? _403
      : _500;

  const handleClick = () => {
    navigate("/", { replace: true });
  };
  const handleClick1 = () => {
    navigate("/auth?mode=login", { replace: true });
  };
  return (
    <div className={style.contianer}>
      <img src={src} />
      <p>{message}</p>
      <button onClick={handleClick}>Go Back</button>
      <button onClick={handleClick1}>Go to login page</button>
    </div>
  );
};

export default CustomErrorCard;
