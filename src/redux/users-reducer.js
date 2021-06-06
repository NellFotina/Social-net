const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  //сначала переменные пишем здесь, потом прокидываем их в UsersContainer через mapStateToProps
  users: [], //пока пустой массив, пользователей мы запрашиваем из сервера и потом сюда сетаем
  //далее начинаем расширять наш стейт, чтобы от этого менялся наш UI
  pageSize: 5, //количество записей на 1 странице
  totalUsersCount: 0, //общее количество записей
  currentPage: 1, //текущая страница
  isFetching: false,
};

const usersReducer = (state = initialState, action) => {
  // reducer принимает старый state и action, анализирует action и что-то изменяет
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    //Делаем копию state и подменяем то свойство, которое надо подменить
    case SET_USERS: {
      return { ...state, users: action.users }; //массив юзеров перезатираем
      //{ ...state, users: [...state.users, ...action.users] } - юзеров добавляем в конец массива
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage }; //берем у action свойство currentPage, именно поэтому оно в export
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count }; //берем у action свойство totalUsersCount, именно поэтому оно в export.
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }

    default:
      return state;
  }
};

//используем АС для того, чтобы не париться (в компоненте), что мы должны сформировать, где и как
//формируем данные в объекте
export const follow = (userId) => ({ type: FOLLOW, userId });

export const unfollow = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users });

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export default usersReducer;
