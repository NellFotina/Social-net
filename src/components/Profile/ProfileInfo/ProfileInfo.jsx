import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  //!props.profile - это все равно, что props.profile == nul || props.profile (тип его) undefined
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.img}>
        <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} />
        ava + description
      </div>
    </div>
  );
};

export default ProfileInfo;
