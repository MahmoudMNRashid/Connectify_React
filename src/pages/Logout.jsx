import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MainContext } from "../context/MainContext";

import { ProfileContext } from "../context/ProfileContext";
import { PageContext } from "../context/PageContext";
import { PostContext } from "../context/PostContext";
import { GroupContext } from "../context/GroupContext";
import { clearCookies } from "../util/help";

const Logout = () => {
  const navigate = useNavigate();

  const { resetAllStates } = useContext(ProfileContext);
  const { resetPageStates } = useContext(PageContext);
  const { resetPostsStates } = useContext(PostContext);
  const { resetGroupStates } = useContext(GroupContext);
  const {
    resetGroupsResultSearch,
    resetPagesResultSearch,
    resetUsersResultSearch,
  } = useContext(MainContext);

  useEffect(() => {
    resetAllStates();
    resetPageStates();
    resetPostsStates();
    resetGroupStates();
    resetGroupsResultSearch();
    resetPagesResultSearch();
    resetUsersResultSearch();
    clearCookies();
    navigate("/auth?mode=login", { replace: true });
  }, [
    resetAllStates,
    resetPageStates,
    resetPostsStates,
    resetGroupStates,
    resetGroupsResultSearch,
    resetPagesResultSearch,
    resetUsersResultSearch,
    navigate,
  ]);

  return null;
};

export default Logout;
