import { useContext } from "react";
import CheckboxInput from "../UI/CheckboxInput";
import { GroupContext } from "../../context/GroupContext";
import classes from "./SettingsCard.module.css";
import useGroup from "../../hooks/UseGroup";
import SettingCard from "./SettingCard";
import SettingCardCover from "./SettingCardCover";
import SettingCardDeleteGroup from "./SettingCardDeleteGroup";
const SettingsCard = () => {
  const { groupInformation } = useContext(GroupContext);

  const { changeSettings, addDescription } = useGroup();

  const name = groupInformation.name;
  const cover = groupInformation.cover;
  const description = groupInformation.description;
  const privacy = groupInformation.privacy;
  const visibility = groupInformation.visibility;
  const immediatePost = groupInformation.immediatePost;
  const whoCanApproveMemberRequest =
    groupInformation.whoCanApproveMemberRequest;
  const whoCanPost = groupInformation.whoCanPost;
  const role = groupInformation.role;

  let settings;
  if (role === "moderator") {
    settings = [
      {
        label: "Privacy :",
        initData: privacy,
        secondData: privacy === "private" ? "public" : "private",
        fn: async (value) => {
          await changeSettings(value, "PRIVACY");
        },
        disabled: visibility === "hidden" && privacy === "private",
      },
      {
        label: "Visibility :",
        initData: visibility,
        secondData: visibility === "visible" ? "hidden" : "visible",
        fn: async (value) => {
          await changeSettings(value, "VISIBILITY");
        },
        disabled: visibility === "visible" && privacy === "public",
      },
      {
        label: "Immediate Post :",
        initData: immediatePost,
        secondData: immediatePost === true ? false : true,
        fn: async (value) => {
          await changeSettings(value, "IMMDIATE_POST");
        },
      },
      {
        label: "Who Can Approve Requests :",
        initData:
          whoCanApproveMemberRequest === "adminsAndModerator"
            ? "admins"
            : "all",
        secondData:
          whoCanApproveMemberRequest === "adminsAndModerator"
            ? "all"
            : "admins",
        fn: async (value) => {
          await changeSettings(value, "WHO_CAN_APPROVE_MEMBER_REQUEST");
        },
      },
      {
        label: "Who Can Post :",
        initData: whoCanPost === "adminsAndModerator" ? "admins" : "all",
        secondData: whoCanPost === "adminsAndModerator" ? "all" : "admins",
        fn: async (value) => {
          await changeSettings(value, "WHO_CAN_POST");
        },
      },
    ];
  } else {
    settings = [
      {
        label: "Immediate Post :",
        initData: immediatePost,
        secondData: immediatePost === true ? false : true,
        fn: async (value) => {
          await changeSettings(value, "IMMDIATE_POST");
        },
      },
      {
        label: "Who Can Approve Requests :",
        initData:
          whoCanApproveMemberRequest === "adminsAndModerator"
            ? "admins"
            : "all",
        secondData:
          whoCanApproveMemberRequest === "adminsAndModerator"
            ? "all"
            : "admins",
        fn: async (value) => {
          await changeSettings(value, "WHO_CAN_APPROVE_MEMBER_REQUEST");
        },
      },
      {
        label: "Who Can Post :",
        initData: whoCanPost === "adminsAndModerator" ? "admins" : "all",
        secondData: whoCanPost === "adminsAndModerator" ? "all" : "admins",
        fn: async (value) => {
          await changeSettings(value, "WHO_CAN_POST");
        },
      },
    ];
  }

  return (
    <>
      <div className={classes.container}>
        {settings.map((setting) => {
          return (
            <div key={setting.label} className={classes.dataHolder}>
              <p>{setting.label}</p>
              <CheckboxInput
                label={setting.label}
                initData={setting.initData}
                secondData={setting.secondData}
                fn={setting.fn}
                disabled={setting.disabled}
              />
            </div>
          );
        })}
        {role === "moderator" && (
          <SettingCard
            result={name}
            validator={(value) => value.length > 0}
            title={"Name"}
            fnEdit={async (value) => {
              await changeSettings(value, "NAME");
            }}
          />
        )}
        <SettingCard
          result={description ? description : ""}
          validator={(value) => value.length > 0}
          title={"Description"}
          fnAdd={async (value) => {
            await addDescription(value);
          }}
          fnEdit={async (value) => {
            await changeSettings(value, "DESCRIPTION");
          }}
        />
        <SettingCardCover result={cover ? cover : ""} />
        {role === "moderator" && <SettingCardDeleteGroup />}
      </div>
    </>
  );
};

export default SettingsCard;
