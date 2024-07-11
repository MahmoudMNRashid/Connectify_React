import { FaRegStar, FaStar } from "react-icons/fa6";
import Textarea from "../UI/Textarea";
import { useContext, useState } from "react";
import classes from "./AddRateCard.module.css";
import { useInput } from "../../hooks/UseInput";
import validator from "validator";
import usePage from "../../hooks/UsePage";
import { MainContext, content } from "../../context/MainContext";
import { PageContext } from "../../context/PageContext";
import { getUserId } from "../../util/help";

const AddRateCard = () => {
  const { disableIsActive, contentModal } = useContext(MainContext);
  const { pageRates } = useContext(PageContext);
  const { addRate, editRate } = usePage();
  const stars = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ];

  //for update rate
  let rate = undefined;

  if (contentModal === content.EDIT_RATE) {
    rate = pageRates.rates.filter((rate) => {
      return rate.from.userId === getUserId();
    })[0];

    console.log(rate);
  }

  const [star, setStar] = useState(
    contentModal === content.EDIT_RATE ? rate.infoRate.value : 0
  );
  const handleAddStar = (index) => {
    console.log(index);
    setStar(index);
  };

  const commentInformation = useInput(
    contentModal === content.EDIT_RATE ? rate.infoRate.comment : "",
    (value) => !validator.isEmpty(value)
  );

  const formAddRateIsValid = commentInformation.valueIsValid && star !== 0;
  const handleAdd_Edit_Rate = () => {
    if (contentModal === content.EDIT_RATE) {
      editRate(commentInformation.value, star, rate.infoRate.ratingId);
    } else {
      addRate(commentInformation.value, star);
    }
  };

  return (
    <div className={classes.container}>
      <Textarea
        placeholder="Add Your Comment"
        textError="Comment should be not empty"
        value={commentInformation.value}
        onChange={(event) => commentInformation.handleInputChange(event)}
        onBlur={commentInformation.handleInputBlur}
        hasError={commentInformation.hasError}
      />
      <div className={classes.stars}>
        {stars[star].map((star, index) => {
          if (star === 0) {
            return (
              <FaRegStar
                className={classes.star}
                key={index}
                onClick={() => {
                  handleAddStar(index + 1);
                }}
              />
            );
          } else {
            return (
              <FaStar
                className={classes.star}
                key={index}
                onClick={() => {
                  handleAddStar(index);
                }}
              />
            );
          }
        })}
      </div>

      <footer className={classes.footer}>
        <button
          disabled={!formAddRateIsValid || disableIsActive}
          onClick={handleAdd_Edit_Rate}
        >
          {"Save"}
        </button>
      </footer>
    </div>
  );
};

export default AddRateCard;
