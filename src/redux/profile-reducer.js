import { usersAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCount: 5 },
    { id: 2, message: "It's my first post", likeCount: 15 },
  ],
  newPostText: "it-kamasutra",
  profile: null, //покажем то, что у нас профиля пока нет, он еще не проинициализировался
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: state.newPostText,
        likeCount: 0,
      };
      // let stateCopy = { ...state };
      // stateCopy.posts = [...state.posts];
      // stateCopy.posts.push(newPost);
      // stateCopy.newPostText = "";
      //return stateCopy;

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      // let stateCopy = { ...state };
      // stateCopy.newPostText = action.newText;
      //return stateCopy;

      return {
        ...state,
        newPostText: action.newPost,
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = () => {
  return {
    type: ADD_POST,
  };
};

export const updateNewPostTextActionCreator = (text) => {
  return { type: UPDATE_NEW_POST_TEXT, newText: text };
};

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
export const getUserProfileThunk = (userId) => (dispatch) => {
  usersAPI.getUserProfile(userId).then((data) => {
    dispatch(setUserProfile(data)); //вызовем здесь АС и передадим в него profile
  });
};

export default profileReducer;
