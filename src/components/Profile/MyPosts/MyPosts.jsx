import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators";
import { Textarea } from "../../common/FormsControl/FormsControl";

//React.memo внутри себя сравнивает новые пропсы и новый state с текущим состоянием
// и только тогда отрисовыает компоненту, когда что-то изменилось
//похож на shouldComponentUpdate в классовой компоненте

const MyPosts = React.memo((props) => {
  //применим reverse, но не к props.posts, а к [...props.posts] - к копии объекта,
  //чтобы ф-ция оставалась имьютабельной и не меняла сам стейт на глобальном уровне
  let postsElements = [...props.posts]
    .reverse()
    .map((p) => <Post key={p.id} message={p.message} like={p.likeCount} />);

  let addNewPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <MyNewPostFormRedux onSubmit={addNewPost} />

      <div className={s.posts}>New post</div>
      {postsElements}
    </div>
  );
});

const maxLength10 = maxLengthCreator(10);

const AddMyNewPost = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newPostText"
        placeholder={"Enter your post"}
        validate={[required, maxLength10]}
      />

      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const MyNewPostFormRedux = reduxForm({ form: "myNewPostForm" })(AddMyNewPost);

export default MyPosts;
