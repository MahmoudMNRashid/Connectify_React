import { pageCategories } from "../../util/help";
import { useContext, useState } from "react";
import { PageContext } from "../../context/PageContext";
import classes from "./EditCategoriesCard.module.css";
import Select from "react-select";
import { MainContext } from "../../context/MainContext";
import usePage from "../../hooks/UsePage";
const EditCategoriesCard = () => {
  const { disableIsActive } = useContext(MainContext);
  const { pageInformation } = useContext(PageContext);
  const { editCategories } = usePage();
  const categories = pageInformation.categories.map((cat) => {
    return { label: cat, value: cat };
  });
  const [selected, setSelected] = useState(categories);
  const [error, setError] = useState(null);
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions.map((option) => option.value));
    if (selectedOptions.length > 3) {
      setError("You can't select more than 4 categories");
    } else {
      setError(null);
    }
  };

  const formIsValid = selected.length < 4 && selected.length > 0;

  const handleEditCategories = () => {
    editCategories(selected);
  };
  return (
    <>
      <Select
        defaultValue={selected}
        onChange={handleSelectChange}
        options={pageCategories}
        isMulti
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <footer className={classes.footer}>
        <button
          disabled={!formIsValid || disableIsActive}
          onClick={handleEditCategories}
        >
          Save
        </button>
      </footer>
    </>
  );
};

export default EditCategoriesCard;
