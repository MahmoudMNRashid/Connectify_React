import { FaCalendar, FaComment, FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import classes from "./RateCard.module.css";
import defaultLogo from "../../assets/post/profile_default.svg";
import { convertDateFormat } from "../../util/help";
import usePage from "../../hooks/UsePage";
import { MainContext, content } from "../../context/MainContext";
import { useContext } from "react";
import MainModalInstance from "../UI/Modals/MainModal";
import { useNavigate } from "react-router-dom";

const RateCard = ({ data: rate }) => {
  console.log(rate);
  const valueRate = rate.infoRate.value;
  const dateRate = convertDateFormat(rate.infoRate.ratingDate);
  const commentRate = rate.infoRate.comment;
  const canUpdate = rate.canUpdate;
  const canDelete = rate.canDelete;
  const rateId = rate.infoRate.ratingId;
  const name = rate.from.firstName + "    " + rate.from.lastName;
  const userId = rate.from.userId;
  const logo = rate.from.logo ? rate.from.logo.asset.link : defaultLogo;
  const stars = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ];
  const { openModal, modalEditNameIsOpen } = useContext(MainContext);

  const handleOpenModalEditRate = () => {
    openModal("rate", content.EDIT_RATE);
  };

  const { deleteRate } = usePage();
  const handleDeleteRate = () => {
    deleteRate(rateId, valueRate);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div className={classes.container}>
      {modalEditNameIsOpen && <MainModalInstance />}
      <header className={classes.header}>
        <img src={logo} onClick={handleNavigate} />
        <p>{name}</p>
      </header>

      <main className={classes.main}>
        <div className={classes.stars__container}>
          <div>
            {stars[valueRate].map((star, index) => {
              if (star === 0) {
                return <FaRegStar key={index} />;
              } else {
                return <FaStar key={index} />;
              }
            })}
          </div>
        </div>
        <div className={classes.info}>
          <FaCalendar fontSize={"1.3rem"} color="#223446" />
          <p>{dateRate}</p>
        </div>
        <div className={classes.info}>
          <FaComment
            fontSize={"1.3rem"}
            color="#223446"
            className={classes.icon}
          />
          <p>{commentRate}</p>
        </div>
      </main>

      <footer className={classes.footer}>
        {canUpdate && <button onClick={handleOpenModalEditRate}>Update</button>}
        {canDelete && <button onClick={handleDeleteRate}>Delete</button>}
      </footer>
    </div>
  );
};

export default RateCard;
