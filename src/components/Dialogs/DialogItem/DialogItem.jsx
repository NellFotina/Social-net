import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog + " " + s.active}>
      <img
        src="https://klike.net/uploads/posts/2019-03/1551511835_22.jpg"
        alt=""
      />
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
