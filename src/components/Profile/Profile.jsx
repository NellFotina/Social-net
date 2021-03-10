import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

let posts = [
  {id: 1, message: "Hi, how are you", likeCount: 5},
  {id: 2, message: "It's my first post", likeCount: 15}
]

const Profile = () => {
  return (
    <main>
      <ProfileInfo />
      <MyPosts posts={posts} />
    </main>
  );
};

export default Profile;
