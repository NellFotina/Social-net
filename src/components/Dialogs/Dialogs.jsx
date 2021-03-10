import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const DialogItem = (props) => {
  let path = "/dialog/" + props.id;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props) => {
  return <div className={s.message}>{props.message}</div>
}

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <DialogItem name="Dima" id="1" />
        <DialogItem name="Nel" id="2" />
        <DialogItem name="Yura" id="3" />
        <DialogItem name="Oleg" id="4" />
        <DialogItem name="Natasha" id="5" />
      </div>
      <div className={s.messages}>
        <Message message='Hi' />
        <Message message='How' />
        <Message message='Yo' />
        <Message message='Yo' />
        <Message message='Yo' />
      </div>
    </div>
  );
};

export default Dialogs;
