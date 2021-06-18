import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} like={p.likeCount} />
  ));

  // let newPostElement = React.createRef();

  // let onAddPost = () => {
  //   props.addPost();
  // };

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text);
  // };

  let addNewPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <MyNewPostFormRedux onSubmit={addNewPost} />
      {/* <div>
        <div>
          <textarea
            onChange={onPostChange}
            ref={newPostElement}
            value={props.newPostText}
          />
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div> */}
      <div className={s.posts}>New post</div>
      {postsElements}
    </div>
  );
};

const AddMyNewPost = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component="textarea"
        name="newPostText"
        placeholder="Enter your post"
      />

      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const MyNewPostFormRedux = reduxForm({ form: "myNewPostForm" })(AddMyNewPost);

export default MyPosts;
