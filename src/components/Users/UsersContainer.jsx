import React from "react";
import { connect } from "react-redux";
import {
  followAC,
  setUsersAC,
  unfollowAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
} from "../../redux/users-reducer";
import Users from "./Users";

let mapStateToProps = (state) => {
  return {
    //здесь формируется наш state после объявления этих переменных
    //в users-reducer, эти параметры отсюда приходят в компоненту Users в props
    users: state.usersPage.users, //внедряет пользователей на нашу страничку (сначала это пустой массив из users-reducer)
    pageSize: state.usersPage.pageSize, //количество записей на 1 странице
    totalUsersCount: state.usersPage.totalUsersCount, //общее количество записей
    currentPage: state.usersPage.currentPage, //текущая страница
  };
};

//пользователь где-то кликнул - нам нужно задиспатчить action (объект, у кот. как min есть св-во type)
//здесь храняться все колбэки, которые диспатчат что-то в state рождаются здесь
let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users)); //диспатчим пользователей, они уходят в state, state меняется, срабатывает перерисовка
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageAC(pageNumber)); //мы диспатчим не action creater,
      //а то, что нам возвращает вызов АС (он всегда возвращает объект,
      //который мы формируем внутри АС)
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountAC(totalCount)); //
    },
  };
};

//после того как стейт изменился, connect заново вызывает mapStateToProps, чтобы достать новые свежие пропсы из стора
export default connect(mapStateToProps, mapDispatchToProps)(Users);
