import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Friends.module.css";

const FriendsItem = (props) => {
  let path = "/friends/" + props.id;

  return (
    <div>
      <div className={s.ava}>
        <img
          src="https://klike.net/uploads/posts/2019-03/1551511835_22.jpg"
          alt=""
        />
      </div>
      <div className={s.friends + " " + s.active}>
        <NavLink to={path}>{props.name} </NavLink>
      </div>
    </div>
  );
};

export default FriendsItem;
