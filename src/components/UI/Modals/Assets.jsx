import { createPortal } from "react-dom";
import classes from "./Assets.module.css";
import Carousel from "react-material-ui-carousel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { PostContext } from "../../../context/PostContext";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { MainContext } from "../../../context/MainContext";
const Modal = () => {
  const { assets, closeModal, addAssets } = useContext(PostContext);
  const { disableIsActive } = useContext(MainContext);
  const handleRemoveAssetsAndCLoseTheModal = () => {
    addAssets([]);
    closeModal("a");
    document.body.classList.remove("hide__scroll");
  };

  return (
    <>
      <div
        onClick={handleRemoveAssetsAndCLoseTheModal}
        className={classes.backdrop}
      ></div>

      <div className={classes.content}>
        <Carousel
          fullHeightHover={false}
          autoPlay={false}
          className={classes.carousel}
        >
          {assets.map((asset) => {
            return (
              <TransformWrapper key={asset.public_id} initialScale={1}>
                <TransformComponent
                  wrapperClass={classes.cs}
                  contentClass={classes.css}
                >
                  {asset.resource_type === "image" ? (
                    <img src={asset.link} />
                  ) : (
                    <video controls width="100%">
                      <source src={asset.link} type="video/mp4" />
                    </video>
                  )}
                </TransformComponent>
              </TransformWrapper>
            );
          })}
        </Carousel>
      </div>
      <button disabled={disableIsActive} className={classes.close}>
        <IoMdClose onClick={handleRemoveAssetsAndCLoseTheModal} />
      </button>
    </>
  );
};

const ModalInstance = () => {
  return createPortal(<Modal />, document.getElementById("modal"));
};

export default ModalInstance;
