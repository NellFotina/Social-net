import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  //сначала переменные пишем здесь, потом прокидываем их в UsersContainer через mapStateToProps
  userId: null,
  email: null,
  login: null,
  isAuth: false, //незалогинен
  captchaUrl: null, //если null, значит каптча не обязательна
};

const authReducer = (state = initialState, action) => {
  // reducer принимает старый state и action, анализирует action и что-то изменяет
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      // debugger; //максимально крайняя точка для проверки
      return {
        ...state,
        ...action.payload, //в action - один объект (data), и мы его деструктуризируем (положим в него userId, email, login)
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

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
// export const getAuthMeThunk = () => (dispatch) => {
//   //если поставить return, то возвращается promise , который мы можем использовать в initializeAppThunk
//   //любой then возвращает промис, и еслим мы напишем "return", то этот промис вернется к нам наружу в другие ф-ции
//   return authAPI.authMe().then((data) => {
//     if (data.resultCode === 0) {
//       let { id, email, login } = data.data;
//       dispatch(setAuthUserData(id, email, login, true));
//     }
//   });
// };

//задача санок - делать асинхронные операции, а результат операций дистпатчить в стейт, чтобы он изменился
export const getAuthMeThunk = () => async (dispatch) => {
  const data = await authAPI.authMe(); //дожидаемся промис с помощью then, а с помощью await. И это возможно только в асинхронной ф-ции (async)
  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const LoginThunk =
  (email, password, rememberMe, captcha) => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(getAuthMeThunk());
    } else {
      //если ошибка в каптче, каптча запросится, url запишется в initialState,
      //и мы на UI можем определить, что если url присутствуем, то мы покажем пользователю каптчу
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrlThunk());
      }
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
      //2-м параметром передаем параметр с проблемным полем ({email: "ERROR"})
      //_error - общая ошибка для всех полей
    }
  };

export const LogoutThunk = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrlThunk = () => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  //санка дает нам ответ url и мы его должны задиспатчить в наш стейт
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
