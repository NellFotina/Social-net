import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  
  let DialogsElements = props.state.dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let MessageElements = props.state.messages.map((m) => <Message message={m.message} />);
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{DialogsElements}</div>
      <div className={s.messages}>{MessageElements}</div>
    </div>
  );
};

export default Dialogs;
