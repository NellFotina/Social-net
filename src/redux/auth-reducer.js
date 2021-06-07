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
      //debugger; максимально крайняя точка для проверки
      return {
        ...state,
        ...action.data, //в action - один объект (data), и мы его деструктуризируем (положим в него userId, email, login)
        isAuth: true,
      };

    default:
      return state;
  }
};

//используем АС для того, чтобы не париться (в компоненте), что мы должны сформировать, где и как
//формируем данные в объекте

export const setAuthUserData = (userId, email, login) => ({
  type: SET_USER_DATA,
  data: { userId, email, login },
});

export default authReducer;
