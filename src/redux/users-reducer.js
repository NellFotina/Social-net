import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "usersPage/FOLLOW";
const UNFOLLOW = "usersPage/UNFOLLOW";
const SET_USERS = "usersPage/SET_USERS";
const SET_CURRENT_PAGE = "usersPage/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "usersPage/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "usersPage/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "usersPage/TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  //сначала переменные пишем здесь, потом прокидываем их в UsersContainer через mapStateToProps
  users: [], //пока пустой массив, пользователей мы запрашиваем из сервера и потом сюда сетаем
  //далее начинаем расширять наш стейт, чтобы от этого менялся наш UI
  pageSize: 5, //количество записей на 1 странице
  totalUsersCount: 0, //общее количество записей
  currentPage: 1, //текущая страница
  isFetching: false, //крутилку показывает
  followingInProgress: [], //индикатор нажатия на кнопку
};

const usersReducer = (state = initialState, action) => {
  // reducer принимает старый state и action, анализирует action и что-то изменяет
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true };
        //   }
        //   return u;
        // }),
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: false };
        //   }
        //   return u;
        // }),
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
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
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }

    default:
      return state;
  }
};

//используем АС для того, чтобы не париться (в компоненте), что мы должны сформировать, где и как
//формируем данные в объекте
export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });

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

export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});
//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));
  let data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items)); //засетаем данные в наш store (users-reducer.js)
  dispatch(setTotalUsersCount(data.totalCount)); //засетаем общее кол-во пользователей с сервера (в девтулзе смотрим на вкладке Network по первому запросу), далее прописываем его в UsersContainer
};

//подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
// export const follow = (userId) => async (dispatch) => {

//   dispatch(toggleFollowingProgress(true, userId));
//   let data = await usersAPI.followUser(userId);
//   if (data.resultCode === 0) {
//     //сервер подтвердил, что подписка произошла
//     dispatch(followSuccess(userId)); //вызываем колбэк (задиспатчим в редьюсер)
//   }
//   dispatch(toggleFollowingProgress(false, userId));
// };

// //подготовим ThunkCreator, кот. мы можем задиспатчить извне сюда
// export const unfollow = (userId) => async (dispatch) => {
//   dispatch(toggleFollowingProgress(true, userId));
//   let data = await usersAPI.unfollowUser(userId);
//   if (data.resultCode === 0) {
//     dispatch(unfollowSuccess(userId));
//   }
//   dispatch(toggleFollowingProgress(false, userId));
// };

const FollowUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    //сервер подтвердил, что подписка произошла
    dispatch(actionCreator(userId)); //вызываем колбэк (задиспатчим в редьюсер)
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    FollowUnfollowFlow(
      dispatch,
      userId,
      usersAPI.followUser.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    FollowUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollowUser.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;
