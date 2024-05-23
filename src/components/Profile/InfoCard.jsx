import classes from "./InfoCard.module.css";
import {
  MdOutlineClose,
  MdContactPhone,
  MdOutlineAlternateEmail,
  MdModeEdit,
  MdDeleteForever,
  MdAdd,
} from "react-icons/md";
import {
  FaTransgender,
  FaBirthdayCake,
  FaUniversity,
  FaSchool,
  FaHome,
  FaCity,
} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { Input } from "../UI/Input.jsx";
import { useContext, useState } from "react";
import { useInput } from "../../hooks/UseInput.js";
import useProfile from "../../hooks/UseProfile.js";
import { MainContext } from "../../context/MainContext.jsx";
import ConfirmModalInstance from "../UI/Modals/ConfirmModal.jsx";
import { ProfileContext } from "../../context/ProfileContext.jsx";
const InfoCard = ({ info }) => {
  const title = info.title;
  const name = info.name;
  const desc = info.desc;
  const replacement = info.replacement;
  const icon = info.icon;
  const textError = info.textError;
  const textError2 = info.textError2;
  const year = info.year;
  const graduated = info.graduated;
  const _idCollege = info._id;
  const _idSchool = info._id;
  const iconMap = {
    FaTransgender: <FaTransgender />,
    FaBirthdayCake: <FaBirthdayCake />,
    FaUniversity: <FaUniversity />,
    FaSchool: <FaSchool />,
    MdContactPhone: <MdContactPhone />,
    MdOutlineAlternateEmail: <MdOutlineAlternateEmail />,
    FaCity: <FaCity />,
    FaHome: <FaHome />,
  };
  const [modes, setModes] = useState({
    edit: false,
    add: false,
    addStatment: replacement ? true : false,
  });
  const { mainInformation } = useContext(ProfileContext);
  const isHeOwner = mainInformation.isHeOwner;
  const { updateAboutApi, addAboutApi, deleteAboutApi } = useProfile();
  const { value, handleInputBlur, handleInputChange, hasError, valueIsValid } =
    useInput(`${name}`, info.validator);
  const {
    value: value2,
    handleInputBlur: handleInputBlur2,
    handleInputChange: handleInputChange2,
    hasError: hasError2,
    valueIsValid: valueIsValid2,
  } = useInput(
    desc === "University" ? graduated : year,
    info.validator2
      ? info.validator2
      : (value) => {
          return value;
        }
  );
  const { openConfirmModal, confirmModalIsOpen } = useContext(MainContext);
  const handleCLickEdit = () => {
    setModes((prev) => {
      const newModes = { ...prev };

      newModes.edit = true;
      newModes.addStatment = false;
      newModes.add = false;
      return newModes;
    });
  };

  const disableButton =
    desc === "Gender" ||
    desc === "City" ||
    desc === "Home town" ||
    desc === "Phone" ||
    desc === "Date of birth"
      ? !valueIsValid
      : !valueIsValid && !valueIsValid2;

  const handleCLickAdd = () => {
    setModes((prev) => {
      const newModes = { ...prev };

      newModes.edit = false;
      newModes.add = true;
      newModes.addStatment = false;
      return newModes;
    });
  };

  const handleCLoseInput = () => {
    setModes((prev) => {
      const newModes = { ...prev };

      newModes.edit = false;
      newModes.add = false;
      newModes.addStatment = replacement ? true : false;
      return newModes;
    });
  };

  const afterDelete = () => {
    setModes((prev) => {
      const newModes = { ...prev };

      newModes.edit = false;
      newModes.add = false;
      newModes.addStatment = true;
      return newModes;
    });
  };

  const afterAdd = () => {
    setModes((prev) => {
      const newModes = { ...prev };

      newModes.edit = false;
      newModes.add = false;
      newModes.addStatment = false;
      return newModes;
    });
  };

  const renderOptions = () => {
    const elements = [];
    for (let i = 1950; i < 2024; i++) {
      if (i === 1950) {
        elements.push(
          <option key="Select year" value="Select year">
            Select year
          </option>
        );
      }
      elements.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return elements;
  };

  const showbuttons =
    modes.edit === false && modes.add === false && modes.addStatment === false;
  const addStatment =
    modes.addStatment === true &&
    modes.edit === false &&
    modes.add === false &&
    isHeOwner;
  // const showInputs = modes.edit === true || modes.add === true;
  const showInfo =
    name &&
    modes.edit === false &&
    modes.add === false &&
    modes.addStatment === false;
  // modes.edit === false && modes.add === false && modes.addStatment === false;

  const showSelectOnly =
    (modes.edit === true &&
      modes.add === false &&
      modes.addStatment === false &&
      desc === "Gender") ||
    (modes.edit === false &&
      modes.add === true &&
      modes.addStatment === false &&
      desc === "Gender");

  const show_InputSelect_HighSchool =
    (modes.edit === true &&
      modes.add === false &&
      modes.addStatment === false &&
      desc === "School") ||
    (modes.edit === false &&
      modes.add === true &&
      modes.addStatment === false &&
      desc === "School");

  const show_InputSelect_Unversity =
    (modes.edit === true &&
      modes.add === false &&
      modes.addStatment === false &&
      desc === "University") ||
    (modes.edit === false &&
      modes.add === true &&
      modes.addStatment === false &&
      desc === "University");

  const showInputOnly =
    (modes.edit === true &&
      modes.add === false &&
      modes.addStatment === false &&
      (desc === "Home town" ||
        desc === "City" ||
        desc === "Phone" ||
        desc === "Date of birth")) ||
    (modes.edit === false &&
      modes.add === true &&
      modes.addStatment === false &&
      (desc === "Home town" ||
        desc === "City" ||
        desc === "Phone" ||
        desc === "Date of birth"));

  const showDeleteButton =
    showbuttons &&
    desc !== "Gender" &&
    desc !== "Date of birth" &&
    desc !== "Email" &&
    isHeOwner;
  const showEditButton = showbuttons && desc !== "Email" && isHeOwner;
  const handleSave = () => {
    if (modes.edit) {
      switch (desc) {
        case "Gender":
          updateAboutApi(
            desc,
            value === "Male" ? { gender: "male" } : { gender: "female" },
            handleCLoseInput
          );

          break;
        case "Date of birth":
          updateAboutApi(desc, { birthday: value }, handleCLoseInput);

          break;
        case "University":
          updateAboutApi(
            desc,
            {
              nameofCollege: value,
              graduated: value2 === "Yes" ? 1 : 0,
              id: _idCollege,
            },
            handleCLoseInput
          );

          break;
        case "Phone":
          updateAboutApi(
            desc,
            {
              phoneNumber: value,
            },
            handleCLoseInput
          );

          break;
        case "City":
          updateAboutApi(
            desc,
            {
              name: value,
            },
            handleCLoseInput
          );

          break;
        case "Home town":
          updateAboutApi(
            desc,
            {
              name: value,
            },
            handleCLoseInput
          );
          break;

        case "School":
          updateAboutApi(
            desc,
            {
              nameofHighSchool: value,
              id: _idSchool,
              year: value2,
            },
            handleCLoseInput
          );

          break;

        default:
          break;
      }
    }

    if (modes.add) {
      switch (desc) {
        case "University":
          addAboutApi(
            desc,
            {
              nameofCollege: value,
              graduated: value2 === "Yes" ? 1 : 0,
            },
            afterAdd
          );

          break;
        case "School":
          addAboutApi(
            desc,
            {
              nameofHighSchool: value,
              year: value2,
            },
            afterAdd
          );
          break;
        case "Phone":
          addAboutApi(
            desc,
            {
              phoneNumber: value,
            },
            afterAdd
          );
          break;
        case "City":
          addAboutApi(
            desc,
            {
              name: value,
            },
            afterAdd
          );
          break;
        case "Home town":
          addAboutApi(
            desc,
            {
              name: value,
            },
            afterAdd
          );
          break;

        default:
          break;
      }
    }
  };

  const handleDelete = () => {
    switch (desc) {
      case "University":
        openConfirmModal(() => {
          deleteAboutApi(desc, { idCollege: _idCollege }, afterDelete);
        });
        break;
      case "Phone":
        openConfirmModal(() => {
          deleteAboutApi(desc, undefined, afterDelete);
        });
        break;
      case "City":
        openConfirmModal(() => {
          deleteAboutApi(desc, undefined, afterDelete);
        });
        break;
      case "Home town":
        openConfirmModal(() => {
          deleteAboutApi(desc, undefined, afterDelete);
        });
        break;

      case "School":
        openConfirmModal(() => {
          deleteAboutApi(desc, { idHighSchool: _idSchool }, afterDelete);
        });
        break;

      default:
        break;
    }
  };

  const buttonsJsx = (
    <div className={classes.buttons__holder}>
      <button onClick={handleCLoseInput} className={classes.cancel}>
        <MdOutlineClose />
      </button>
      <button
        className={classes.confirm}
        onClick={handleSave}
        disabled={disableButton}
      >
        <GiConfirmed />
      </button>
    </div>
  );
  return (
    <div className={classes.container}>
      {confirmModalIsOpen && <ConfirmModalInstance />}
      <header className={classes.header}>{title}</header>

      <main className={classes.main}>
        <i>{iconMap[icon]}</i>
        <div className={classes.info}>
          {showInfo && (
            <div className={classes.Ps}>
              <p>{name}</p>
              <p>{desc}</p>
            </div>
          )}

          {addStatment && (
            <button onClick={handleCLickAdd}>
              <MdAdd /> {replacement}
            </button>
          )}

          <div>
            {showInputOnly && (
              <div className={classes.input__x}>
                <Input
                  placeholder={replacement || `Add ${desc}`}
                  textError={textError}
                  type={desc === "Date of birth" ? "date" : "text"}
                  value={value}
                  onChange={(event) => handleInputChange(event)}
                  onBlur={handleInputBlur}
                  hasError={hasError}
                />
                {buttonsJsx}
              </div>
            )}

            {showSelectOnly && (
              <div className={classes.select__x}>
                <div className={classes.select}>
                  <select
                    className={`${hasError ? classes.invalid : null}`}
                    value={value}
                    onChange={(event) => handleInputChange(event)}
                    onBlur={handleInputBlur}
                  >
                    <option value="0">Select gender:</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {hasError && (
                    <p className={classes["text--invalid"]}>{textError}</p>
                  )}
                </div>
                {buttonsJsx}
              </div>
            )}

            {show_InputSelect_HighSchool && (
              <div className={classes["input-select__x"]}>
                <Input
                  placeholder={replacement || `Add ${desc}`}
                  textError={textError}
                  type="text"
                  value={value}
                  onChange={(event) => handleInputChange(event)}
                  onBlur={handleInputBlur}
                  hasError={hasError}
                />
                <div className={classes.select}>
                  <select
                    className={`${hasError2 ? classes.invalid : null}`}
                    value={value2}
                    onChange={(event) => handleInputChange2(event)}
                    onBlur={handleInputBlur2}
                  >
                    {renderOptions()}
                  </select>
                  {hasError2 && (
                    <p className={classes["text--invalid"]}>{textError2}</p>
                  )}
                </div>
                {buttonsJsx}
              </div>
            )}
            {show_InputSelect_Unversity && (
              <div className={classes["input-select__x"]}>
                <Input
                  placeholder={replacement || `Add ${desc}`}
                  textError={textError}
                  type="text"
                  value={value}
                  onChange={(event) => handleInputChange(event)}
                  onBlur={handleInputBlur}
                  hasError={hasError}
                />
                <div className={classes.select}>
                  <select
                    className={`${hasError2 ? classes.invalid : null}`}
                    value={value2}
                    onChange={(event) => handleInputChange2(event)}
                    onBlur={handleInputBlur2}
                  >
                    <option value="graduated?">graduated?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {hasError2 && (
                    <p className={classes["text--invalid"]}>{textError2}</p>
                  )}
                </div>
                {buttonsJsx}
              </div>
            )}
          </div>
        </div>

        <div className={classes.buttons}>
          {showbuttons && (
            <>
              {showEditButton && (
                <button>
                  <MdModeEdit onClick={handleCLickEdit} />
                </button>
              )}
              {showDeleteButton && (
                <button>
                  <MdDeleteForever onClick={handleDelete} color="#ff3333" />
                </button>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default InfoCard;
