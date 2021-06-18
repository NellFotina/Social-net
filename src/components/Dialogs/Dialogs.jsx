import React from "react";
import { Redirect } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let DialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let MessageElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));
  let newMessageBody = state.newMessageBody;

  let addNewMessage = (values) => {
    // в values хранится то, что мы назвали в Field (name="newMessageBody")
    //собранное сообщение отправляем в бизнес
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Redirect to={"/login"} />;
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{DialogsElements}</div>
      <div className={s.messages}>{MessageElements}</div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
