import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  //!props.profile - это все равно, что props.profile == null || props.profile (тип его) underfined
  if (!profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.img}></div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large} alt="" />
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
