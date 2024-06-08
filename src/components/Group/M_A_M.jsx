import classes from "./M_A_M.module.css";
import { FaEye, FaUserPlus } from "react-icons/fa";
import { BsPersonUp } from "react-icons/bs";
import { BsPersonDown } from "react-icons/bs";
import { RiUserForbidFill } from "react-icons/ri";
import { convertDateFormat } from "../../util/help";
import defaultLogo from "../../assets/post/profile_default.svg";
import { GroupContext } from "../../context/GroupContext";
import { useContext, useState } from "react";
import useGroup from "../../hooks/UseGroup";
import Loader2 from "../UI/Loader2";
import { FaUnlock } from "react-icons/fa";
import { useInput } from "../../hooks/UseInput";
import { MdOutlineClose } from "react-icons/md";
const M_A_M = ({ data: member, isMember, isBlocked, isFriendNotJoin }) => {
  const { groupInformation } = useContext(GroupContext);
  const { blockMemberOrAdmin, isLoading } = useGroup();
  const { upgradeMemberToAdmin, isLoading: isLoading1 } = useGroup();
  const { downgradeAdminToMember, isLoading: isLoading2 } = useGroup();
  const { unblockAMember, isLoading: isLoading3 } = useGroup();
  const { inviteFriend } = useGroup();
  const role = groupInformation.role;
  const name = member.firstName + " " + member.lastName;
  const joiningDate = member.joiningDate
    ? convertDateFormat(member.joiningDate)
    : "";
  const userId = member.userId;
  const logo =
    member.logo && member.logo.asset && member.logo.asset.link
      ? member.logo.asset.link
      : defaultLogo;

  const [openSelectKeepPost, setOpenSelectKeepPost] = useState(false);
  let {
    value,
    handleInputBlur,
    handleInputChange,
    hasError,
    valueIsValid,
    setDidEdit,
    setEnteredValue,
  } = useInput(`keep post?`, (value) => value === "Yes" || value === "No");

  const handleCloseSelect = () => {
    setOpenSelectKeepPost(false);
    setDidEdit(false);
    setEnteredValue("keep post?");
  };

  const handleBlockMember = () => {
    blockMemberOrAdmin(
      userId,
      value === "Yes" ? 1 : 0,
      isMember ? "member" : "admin"
    );
  };
  return (
    <div className={classes.f}>
      <div className={classes.container}>
        <div className={classes.info}>
          <div className={classes.img}>
            <img src={logo} />
          </div>
          <div className={classes.texts}>
            <p>{name}</p>
            <p>{joiningDate}</p>
          </div>
        </div>
        <div className={classes.buttons}>
          <button>
            <FaEye fontSize={"1.3rem"} /> Visit
          </button>
          {isFriendNotJoin && (
            <button
              onClick={() => {
                inviteFriend(userId);
              }}
            >
              <FaUserPlus fontSize={"1.3rem"} /> Invite
            </button>
          )}
          {role === "moderator" && isMember && !isBlocked && (
            <button
              onClick={() => {
                upgradeMemberToAdmin(userId);
              }}
            >
              <BsPersonUp fontSize={"1.3rem"} />
              {!isLoading1 ? "Upgrade" : <Loader2 />}
            </button>
          )}
          {role === "moderator" && !isMember && !isBlocked && (
            <button
              onClick={() => {
                downgradeAdminToMember(userId);
              }}
            >
              <BsPersonDown fontSize={"1.3rem"} />
              {!isLoading2 ? "Downgrade" : <Loader2 />}
            </button>
          )}
          {((role === "admin" && isMember) || role === "moderator") &&
            !isBlocked && (
              <button
                onClick={() => {
                  setOpenSelectKeepPost(true);
                }}
              >
                <RiUserForbidFill fontSize={"1.3rem"} />
                {!isLoading ? "Block" : <Loader2 />}
              </button>
            )}
          {!isMember && isBlocked && (
            <button
              onClick={() => {
                unblockAMember(userId);
              }}
            >
              <FaUnlock fontSize={"1.3rem"} />
              {!isLoading3 ? "Unblock" : <Loader2 />}
            </button>
          )}
        </div>
      </div>
      {openSelectKeepPost && (
        <div className={classes.block}>
          <h3>
            Choose whether you want to keep or delete posts for this member
          </h3>
          <div className={classes.select__x}>
            <div className={classes.select}>
              <select
                className={`${hasError ? classes.invalid : null}`}
                value={value}
                onChange={(event) => handleInputChange(event)}
                onBlur={handleInputBlur}
              >
                <option value="keep post?">keep post ?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {hasError && (
                <p className={classes["text--invalid"]}>
                  Please select whether you want to keep or delete posts
                </p>
              )}
            </div>

            <MdOutlineClose
              fontSize={"2.1rem"}
              color="#ff3333"
              cursor={"pointer"}
              onClick={handleCloseSelect}
            />
          </div>
          <button
            onClick={handleBlockMember}
            disabled={!valueIsValid}
            className={classes.confirm}
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default M_A_M;
