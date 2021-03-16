import React from "react";
import s from './Friends.module.css';
import FriendsItem from "./FriendsItem/FriendsItem";

const Friends = (props) => {
    
    let friendsElement = props.state.friends.map((f) => (
        <FriendsItem name={f.name} id={f.id} />
      ));
          return (
        <div className={s.friendsItems}>{friendsElement}</div>       
    )
}

export default Friends;
