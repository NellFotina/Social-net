import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  //сначала переменные пишем здесь, потом прокидываем их в UsersContainer через mapStateToProps
  userId: null,
  email: null,
  login: null,
  isAuth: false, //незалогинен
};

const authReducer = (state = initialState, action) => {
  // reducer принимает старый state и action, анализирует action и что-то изменяет
  switch (action.type) {
    case SET_USER_DATA:
      // debugger; //максимально крайняя точка для проверки
      return {
        ...state,
        ...action.payload, //в action - один объект (data), и мы его деструктуризируем (положим в него userId, email, login)
        // isAuth: true, // после того, как сделали Log out, эта строка не нужна
      };

    default:
      return state;
  }
};

//используем АС для того, чтобы не париться (в компоненте), что мы должны сформировать, где и как
//формируем данные в объекте

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
export const getAuthMeThunk = () => (dispatch) => {
  authAPI.authMe().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};

export const LoginThunk = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(getAuthMeThunk());
    } else {
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
      //2-м параметром передаем параметр с пробоемным полем ({email: "ERROR"})
      //_error - общая ошибка для всех полей
    }
  });
};

export const LogoutThunk = () => (dispatch) => {
  authAPI.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
