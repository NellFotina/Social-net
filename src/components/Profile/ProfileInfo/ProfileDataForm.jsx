import React from "react";
import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControl/FormsControl";
import s from "./ProfileInfo.module.css";
import style from "../../common/FormsControl/FormsControle.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {/* деструктуризация 
      {props.error && (
        //этот тег появляется только, когда есть ошибка в заполнении поля
        <div className={style.formSummaryError}>{props.error}</div>
      )} */}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <b>Full name</b>: {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking for a job</b>:
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div>
        <b>My professional skills</b>:
        {createField(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>

      <div>
        <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Contact</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <b>
                {key} : {createField(key, "contacts." + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

//наша форма ProfileDataForm использует элемент из reduxForm - createField возвращает Field,
//поэтому обернем ее reduxForm
const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataReduxForm;
