import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="https://saltway.in.ua/wp-content/uploads/2021/01/fotina-1200x992-1.jpg" />
      {props.message}
      <div>
        <span>Like: </span>
        <span>{props.like}</span>
      </div>
    </div>
  );
};

export default Post;
