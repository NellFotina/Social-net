import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCount: 5 },
    { id: 2, message: "It's my first post", likeCount: 15 },
  ],
  // newPostText: "it-kamasutra",
  profile: null, //покажем то, что у нас профиля пока нет, он еще не проинициализировался
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likeCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    // case UPDATE_NEW_POST_TEXT: {
    //   return {
    //     ...state,
    //     newPostText: action.newPost,
    //   };
    // }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    //когда статус придет с сервера, мы хотим его засетать
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

// export const updateNewPostTextActionCreator = (text) => {
//   return { type: UPDATE_NEW_POST_TEXT, newText: text };
// };

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
export const getUserProfileThunk = (userId) => (dispatch) => {
  profileAPI.getUserProfile(userId).then((data) => {
    dispatch(setUserProfile(data)); //вызовем здесь АС и передадим в него profile
  });
};

export const getStatusThunk = (userId) => (dispatch) => {
  profileAPI.getStatus(userId).then((data) => {
    dispatch(setStatus(data)); //вызовем здесь АС и передадим в него status
  });
};

export const updateStatusThunk = (status) => (dispatch) => {
  //чувак напечатал статус и нам его прислали,
  //теперь нам хотелось бы его на сервер отправить
  profileAPI.updateStatus(status).then((data) => {
    //если статус передался на сервер без ошибки - засетаем его к себе
    if (data.resultCode === 0) {
      dispatch(setStatus(status)); //вызовем здесь АС и передадим в него status
    }
  });
};

export default profileReducer;
