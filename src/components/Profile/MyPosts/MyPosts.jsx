import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={s.posts}>New post</div>
      <Post message="Hi, how are you" like="5" />
      <Post message="It's my first post" like="13" />
    </div>
  );
};

export default MyPosts;
