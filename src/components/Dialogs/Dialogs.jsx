import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <div className={s.dialog + " " + s.active}>
          <NavLink to="/dialog/1">Dima</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialog/2">Nel</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialog/3">Yura</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialog/4">Oleg</NavLink>
        </div>
        <div className={s.dialog}>
          <NavLink to="/dialog/5">Natasha</NavLink>
        </div>
      </div>
      <div className={s.messages}>
        <div className={s.message}>Hi</div>
        <div className={s.message}>How are you</div>
        <div className={s.message}>Yo</div>
      </div>
    </div>
  );
};

export default Dialogs;
