import { useContext, useState } from "react";
import { GroupContext } from "../../context/GroupContext";
import Post from "../Post/Post";
import classes from "./ReportCard.module.css";
import { GoReport } from "react-icons/go";
import defaultProfile from "../../assets/post/profile_default.svg";
import { CiCalendarDate } from "react-icons/ci";
import { convertDateFormat } from "../../util/help";
import { useInput } from "../../hooks/UseInput";
import { MdOutlineClose } from "react-icons/md";
import useGroup from "../../hooks/UseGroup";
import Loader2 from "../UI/Loader2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/UsePost";
import { MainContext } from "../../context/MainContext";
const ReportCard = ({ data, isAdmin }) => {
  const { disableIsActive } = useContext(MainContext);
  const { groupInformation } = useContext(GroupContext);
  const { deleteReport, isLoading } = useGroup();
  const { deletePost } = usePost();
  const { blockMemberOrAdmin } = useGroup();
  const { deleteAdminReport } = useGroup();
  const { downgradeAdminToMember } = useGroup();
  const navigate = useNavigate();

  const group = {
    name: groupInformation.name,
    groupId: groupInformation._id,
    description: groupInformation.description
      ? groupInformation.description
      : undefined,
    cover: groupInformation.cover ? groupInformation.cover : undefined,
    yourRoleInGroup: groupInformation.role,
  };
  const postType = "group";

  const post = {
    group,
    postType,
    canDelete: true,
    canUpdate: false,
    canReport: false,
    canBlocked: true,
    isHeOwnerOfPost: false,
    canCommentOrLike: true,
    owner: data.post.ownerPost,
    post: data.post,
  };

  const from = {
    ...data.from,
    logo:
      data.from.logo && data.from.logo.asset && data.from.logo.asset.link
        ? data.from.logo.asset.link
        : defaultProfile,
  };
  const reportDescription = data.description;

  const reportDate = convertDateFormat(data.reportDate);
  const reportId = data.reportId;
  const [openSelectKeepPost, setOpenSelectKeepPost] = useState(false);
  const { value, handleInputBlur, handleInputChange, hasError, valueIsValid } =
    useInput(`keep post?`, (value) => value === "Yes" || value === "No");

  const handelDeleteReport = () => {
    if (isAdmin) {
      deleteAdminReport(reportId);
    } else {
      deleteReport(reportId);
    }
  };
  const handleDeletePostAndReport = async () => {
    try {
      if (isAdmin) {
        await Promise.all([
          deletePost(
            "group",
            post.post.postId,
            undefined,
            group.groupId,
            "group"
          ),
          deleteAdminReport(reportId),
        ]);
      } else {
        await Promise.all([
          deletePost(
            "group",
            post.post.postId,
            undefined,
            group.groupId,
            "group"
          ),
          deleteReport(reportId),
        ]);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };
  const handleDeletePostAndReportAndBlockMember = async () => {
    try {
      if (isAdmin) {
        await Promise.all([
          deletePost(post.post.postId),
          deleteAdminReport(reportId),
          blockMemberOrAdmin(
            post.owner.userId,
            value === "Yes" ? 1 : 0,
            "member"
          ),
        ]);
      } else {
        await Promise.all([
          deletePost(post.post.postId),
          deleteReport(reportId),
          blockMemberOrAdmin(
            post.owner.userId,
            value === "Yes" ? 1 : 0,
            "member"
          ),
        ]);
      }
      toast.success("done");
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDeletePostAndReportAndDowngradeAdmin = async () => {
    try {
      await Promise.all([
        deleteAdminReport(reportId),
        downgradeAdminToMember(post.owner.userId),
      ]);
      await deletePost(
        "group",
        post.post.postId,
        undefined,
        group.groupId,
        "group"
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleNavigatToProfile = () => {
    navigate(`/profile/${from.userId}`);
  };
  return (
    <div className={classes.container}>
      <div className={classes.post}>
        <h2>The post complained about</h2>
        <Post data={post} hideMenu={true} />
      </div>

      <div className={classes.from}>
        <h2>The person who complained</h2>
        <div>
          <div className={classes.info}>
            <div className={classes.img}>
              <img src={from.logo} />
            </div>

            <p>
              {from.firstName} {from.lastName}
            </p>
          </div>
          <button disabled={disableIsActive} onClick={handleNavigatToProfile}>
            Visit
          </button>
        </div>
      </div>

      <div className={classes.data}>
        <h2>Information about the complaint</h2>
        <div>
          <GoReport fontSize={"2rem"} />
          <p>{reportDescription}</p>
        </div>
        <div>
          <CiCalendarDate fontSize={"2rem"} />
          <p>{reportDate}</p>
        </div>
      </div>

      <div className={classes.options}>
        <h2>Options</h2>
        <div className={classes.buttons__container}>
          <button
            disabled={disableIsActive}
            onClick={handleDeletePostAndReport}
          >
            Delete Post & Report
          </button>
          <button disabled={disableIsActive} onClick={handelDeleteReport}>
            {!isLoading ? "Delete Report" : <Loader2 />}
          </button>
          <button
            disabled={disableIsActive}
            onClick={() => {
              setOpenSelectKeepPost(true);
            }}
          >
            Block Member
          </button>
          {isAdmin && (
            <button
              disabled={disableIsActive}
              onClick={handleDeletePostAndReportAndDowngradeAdmin}
            >
              Downgrade admin
            </button>
          )}
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
                onClick={() => {
                  setOpenSelectKeepPost(false);
                }}
              />
            </div>
            <button
              onClick={handleDeletePostAndReportAndBlockMember}
              disabled={!valueIsValid || disableIsActive}
              className={classes.confirm}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
