import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogs = [
    { id: 1, name: "Dima" },
    { id: 2, name: "Nel" },
    { id: 3, name: "Yura" },
    { id: 4, name: "Oleg" },
    { id: 5, name: "Natasha" },
  ];

  let messages = [
    { id: 1, message: "Hi" },
    { id: 2, message: "How" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ];

  let DialogsElements = dialogs.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let MessageElements = messages.map((m) => <Message message={m.message} />);
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{DialogsElements}</div>
      <div className={s.messages}>{MessageElements}</div>
    </div>
  );
};

export default Dialogs;
