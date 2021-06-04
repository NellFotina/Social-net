const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

let initialState = {
  //сначала переменные пишем здесь, потом прокидываем их в UsersContainer через mapStateToProps
  users: [], //пока пустой массив, пользователей мы запрашиваем из сервера и потом сюда сетаем
  //далее начинаем расширять наш стейт, чтобы от этого менялся наш UI
  pageSize: 5, //количество записей на 1 странице
  totalUsersCount: 0, //общее количество записей
  currentPage: 1, //текущая страница
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

    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: FOLLOW, userId });

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId });

export const setUsersAC = (users) => ({ type: SET_USERS, users });

export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export const setTotalUsersCountAC = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

export default usersReducer;
