import { getAuthMeThunk } from "./auth-reducer";

const INITIALIZED_SUCCESS = "app/INITIALIZED_SUCCESS"; //action

let initialState = {
  //сначала переменные пишем здесь, потом прокидываем их в App через mapStateToProps
  initialized: false, //непроинициализирован
  //globalError: null, //для App - реакция на ошибки валидации -
  //если делать локальный обработчик событий try - catch
  // (например, очень длинный статус)
};

const appReducer = (state = initialState, action) => {
  // reducer принимает старый state и action, анализирует action и что-то изменяет
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      // если придет action INITIALIZED_SUCCESS, то мы поменяем флаг инициализации на true
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

//используем АС для того, чтобы не париться (в компоненте), что мы должны сформировать, где и как
//формируем данные в объекте

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
// export const initializeAppThunk = () => (dispatch) => {
//   let promise = dispatch(getAuthMeThunk());
//   //если бы был 1 промис, то
//   //promise.then(()=>{
//   //   dispatch(initializedSuccess());
//   // })

//   //но если промисов много (от каждой санки) И ОНИ НЕ ЗАВИСЯТ ДРУГ ОТ ДРУГА, то мы бы каждый промис завернули бы в массив и вызвали бы так:
//   Promise.all([promise])
//     //теперь резолвимся (.then) у "all"
//     .then(() => {
//       //когда закончатся все асинхронные операции, задиспач событие инициализации
//       //(мы должны дождаться окончания всех параллельных запросов)
//       dispatch(initializedSuccess());
//     });
// };

//а еще лучше именно В НАШЕМ СЛУЧАЕ лучше делать вот так,
//в этом случае промисы зависят друг от друга, а нам этого и надо
// (если делать несколько await dispatch(f()), то сначала выполнится первый,
// потом второй промис и так далее):

export const initializeAppThunk = () => async (dispatch) => {
  await dispatch(getAuthMeThunk());
  dispatch(initializedSuccess());
};

export default appReducer;
