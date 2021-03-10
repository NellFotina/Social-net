import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {

let posts = [
  {id: 1, message: "Hi, how are you", likeCount: 5},
  {id: 2, message: "It's my first post", likeCount: 15}
]

let postsElements = posts.map (p => <Post message={p.message} like={p.likeCount} />);

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
      {postsElements}
    </div>
  );
};

export default MyPosts;
