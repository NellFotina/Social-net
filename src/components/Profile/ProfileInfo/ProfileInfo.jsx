import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/image/user_photo.png";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  //!props.profile - это все равно, что props.profile == null || props.profile (тип его) underfined
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      //если массив файлов есть, длина есть
      savePhoto(e.target.files[0]); //вызываем колбек и передаем во внешний мир файл, который выбрали
    }
  };

  return (
    <div>
      <div className={s.img}></div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          className={s.mainPhoto}
          alt=""
        />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
