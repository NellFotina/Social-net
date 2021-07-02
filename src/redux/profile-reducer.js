import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
//action:
const ADD_POST = "profilePage/ADD-POST";
const DELETE_POST = "profilePage/DELETE_POST";
const SET_USER_PROFILE = "profilePage/SET_USER_PROFILE";
const SET_STATUS = "profilePage/SET_STATUS";
const SAVE_PHOTO_SUCCEES = "profilePage/SAVE_PHOTO_SUCCEES";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCount: 5 },
    { id: 2, message: "It's my first post", likeCount: 15 },
  ],

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
    case DELETE_POST: {
      return {
        ...state,
        posts: [...state.posts.filter((p) => p.id !== action.postId)],
      };
    }

    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    //когда статус придет с сервера, мы хотим его засетать
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case SAVE_PHOTO_SUCCEES: {
      //обновим фотку на ту, что пришла в action
      return { ...state, profile: { ...state.profile, photos: action.photos } };
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

export const deletePostAC = (postId) => {
  return {
    type: DELETE_POST,
    postId,
  };
};

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};

export const savePhotoSuccess = (photos) => {
  return { type: SAVE_PHOTO_SUCCEES, photos }; //AC вернет новую фотку и сработает редьюсер
};

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
export const getUserProfileThunk = (userId) => async (dispatch) => {
  let data = await profileAPI.getUserProfile(userId);
  dispatch(setUserProfile(data)); //вызовем здесь АС и передадим в него profile
};

export const getStatusThunk = (userId) => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data)); //вызовем здесь АС и передадим в него status
};

export const updateStatusThunk = (status) => async (dispatch) => {
  //чувак напечатал статус и нам его прислали,
  //теперь нам хотелось бы его на сервер отправить
  let data = await profileAPI.updateStatus(status);
  //если статус передался на сервер без ошибки - засетаем его к себе
  if (data.resultCode === 0) {
    dispatch(setStatus(status)); //вызовем здесь АС и передадим в него status
  }
};

export const savePhotoThunk = (file) => async (dispatch) => {
  //сюда будем отправлять выбранный файл
  let data = await profileAPI.savePhoto(file); //попросим сервер сохранить фото

  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos)); //обновим нашу фотку
  }
};

//сюда приходит (profile), который мы отправим на сервер
export const saveProfileThunk = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile); //попросим сервер сохранить данные, передаем ему profile

  if (data.resultCode === 0) {
    dispatch(getUserProfileThunk(userId)); //обновим наш профиль
  } else {
    dispatch(
      // stopSubmit("edit-profile", { contacts: { facebook: data.messages[0] } })
      stopSubmit("edit-profile", { _error: data.messages[0] })
    );
    //1-й параметр - значение из ProfileDataReduxForm; 2-м параметром передаем параметр с проблемным полем ({email: "ERROR"})
    //_error - общая ошибка для всех полей
    return Promise.reject(data.messages[0]); //возвращает промис, который отклоняется ошибкой,
    //закинем и саму ошибку в промис, если вдруг она нам понадобится для каких-либо отображений
  }
};

export default profileReducer;
