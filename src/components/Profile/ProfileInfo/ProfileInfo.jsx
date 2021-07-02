import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/image/user_photo.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false); //Hook

  //!props.profile - это все равно, что props.profile == null || props.profile (тип его) underfined
  if (!profile) {
    return <Preloader />;
  }
  const onSubmit = (formData) => {
    //чтобы проверить данные в форме, введем в консоли: store.getState().form
    // console.log(formData);
    saveProfile(formData).then(() => {
      //обязательно ждем сохранения профиля (then) - профиль не сохранит невалидные поля
      setEditMode(false); //убираем режим редактирования только после успешного сохранения профиля
    });
  };

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
        <div>
          {editMode ? ( // editMode изначально false
            <ProfileDataForm
              initialValues={profile} //для того, чтобы при заходе в форму редактирования
              //в полях сохранялась информация о нас, кот. нужно редактировать
              //(чтобы поля не были пустыми)
              profile={profile}
              onSubmit={onSubmit}
            />
          ) : (
            <ProfileData
              goToEditMode={() => setEditMode(true)}
              profile={profile}
              isOwner={isOwner}
            />
          )}
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      {isOwner && ( //Кнопка показывается только собственнику профиля
        <div>
          <button onClick={goToEditMode}>Edit data</button>
        </div>
      )}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contact</b>: {/* проитерируемся по объекту */}
        {/* Object - глобальный конструктор, прородитель всех объектов, завернет все ключи в массив строк*/}
        {/* keys - метод, получает ключи из объекта */}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key} //когда есть map, обязательно должен быть key
              contactTitle={key}
              contactValue={profile.contacts[key]} // a.name = a["name"]
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
