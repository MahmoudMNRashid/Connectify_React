import {
  MdArrowForwardIos,
  MdDelete,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import classes from "./CustomSlider.module.css";
import { FaArrowTurnUp } from "react-icons/fa6";
import { useContext, useRef } from "react";
import { MainContext } from "../../context/MainContext";
import useProfile from "../../hooks/UseProfile";

const CustomSlider = ({ assets }) => {
  const {
    deleteCurrentPhotoOrPreviousPhoto,
    setPreviousPhotoAsCurrentProfilePhoto,
  } = useProfile();
  const { disableIsActive } = useContext(MainContext);
  const containerRef = useRef(null);
  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 400; // Scroll to the right by 500px
    }
  };
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 400; // Scroll to the right by 500px
    }
  };
  const handleDeletePhoto = (public_id) => {
    deleteCurrentPhotoOrPreviousPhoto(public_id);
  };
  const handleSetPreviousPhoto = async (public_id) => {
    await setPreviousPhotoAsCurrentProfilePhoto(public_id);
    containerRef.current.scrollLeft -= 400;
  };
  return (
    <>
      {" "}
      <p className={classes.intro}>current photo with all previous photos</p>
      <div className={classes.cont}>
        <button>
          <MdOutlineArrowBackIos onClick={handleScrollLeft} />
        </button>
        <div className={classes.container} ref={containerRef}>
          {assets.map((asset) => {
            return (
              <div
                className={classes.img__container}
                key={asset.asset.public_id}
              >
                <img src={asset.asset.link} />
                <div className={classes.buttons__container}>
                  <button
                    disabled={disableIsActive}
                    onClick={() => {
                      handleDeletePhoto(asset.asset.public_id);
                    }}
                  >
                    <MdDelete />
                  </button>
                  {!asset.current && (
                    <button
                      disabled={disableIsActive}
                      onClick={() => {
                        handleSetPreviousPhoto(asset.asset.public_id);
                      }}
                    >
                      <FaArrowTurnUp />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={handleScrollRight}>
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default CustomSlider;
