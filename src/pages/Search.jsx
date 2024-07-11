import SearchIcon from "@mui/icons-material/Search";
import { Box, Tab, Tabs, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import UserTab from "../components/Search/UserTab";
import GroupTab from "../components/Search/GroupTab";
import PageTab from "../components/Search/PageTab";
import { MainContext } from "../context/MainContext";

const Search = () => {
  const {
    resetPagesResultSearch,
    resetGroupsResultSearch,
    resetUsersResultSearch,
  } = useContext(MainContext);

  const [value, setValue] = useState(0);
  const [startSearch, setStartSearch] = useState(false);
  const ref = useRef(null);
  const query = ref.current?.value;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearchClick = () => {
    setStartSearch(false);
    resetGroupsResultSearch();
    resetPagesResultSearch();
    resetUsersResultSearch();
    const query = ref.current.value;

    if (query.length > 2) {
      setStartSearch(true);
    }
  };
  return (
    <div className="container_search">
      <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
        <SearchIcon
          sx={{ color: "action.active", mr: 1, my: 0.5 }}
          onClick={handleSearchClick}
        />
        <TextField inputRef={ref} id="input-with-sx" variant="standard" />
      </Box>
      <Tabs
        TabIndicatorProps={{ style: { backgroundColor: "black" } }}
        textColor="black"
        indicatorColor="primary"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        centered
        style={{ width: "100%", backgroundColor: "#BED7DC", margin: "1rem 0" }}
      >
        <Tab label="Users" />
        <Tab label="Groups" />
        <Tab label="Pages" />
      </Tabs>
      {value === 0 && <UserTab startSearch={startSearch} query={query} />}
      {value === 1 && <GroupTab startSearch={startSearch} query={query} />}
      {value === 2 && <PageTab startSearch={startSearch} query={query} />}
    </div>
  );
};

export default Search;
