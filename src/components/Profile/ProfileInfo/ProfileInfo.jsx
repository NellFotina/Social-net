import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  //!props.profile - это все равно, что props.profile == null || props.profile (тип его) underfined
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.img}></div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="" />
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
