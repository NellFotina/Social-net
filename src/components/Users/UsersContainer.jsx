import React from "react";
import * as axios from "axios";
import { connect } from "react-redux";
import {
  follow,
  setUsers,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersComponent extends React.Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
      //и количество записей на 1 странице (count-название из документации)
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count${this.props.pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items); //засетаем данные в наш store (users-reducer.js)
        this.props.setTotalUsersCount(response.data.totalCount); //засетаем общее кол-во пользователей с сервера (в девтулзе смотрим на вкладке Network по первому запросу), далее прописываем его в UsersContainer
      });
  }
  //все колбеки приходят сюда из mapDispatchToProps
  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    axios
      //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
      //и количество записей на 1 странице (count-название из документации)
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count${this.props.pageSize}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items); //засетаем данные в наш store (users-reducer.js)
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    //здесь формируется наш state после объявления этих переменных
    //в users-reducer, эти параметры отсюда приходят в компоненту Users в props
    users: state.usersPage.users, //внедряет пользователей на нашу страничку (сначала это пустой массив из users-reducer)
    pageSize: state.usersPage.pageSize, //количество записей на 1 странице
    totalUsersCount: state.usersPage.totalUsersCount, //общее количество записей
    currentPage: state.usersPage.currentPage, //текущая страница
    isFetching: state.usersPage.isFetching,
  };
};

//пользователь где-то кликнул - нам нужно задиспатчить action (объект, у кот. как min есть св-во type)
//здесь храняться все колбэки, которые диспатчат что-то в state рождаются здесь
// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followAC(userId));
//     },
//     unfollow: (userId) => {
//       dispatch(unfollowAC(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersAC(users)); //диспатчим пользователей, они уходят в state, state меняется, срабатывает перерисовка
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageAC(pageNumber)); //мы диспатчим не action creater, мы диспатчим вызов АС
//       //а то, что нам возвращает вызов АС (он всегда возвращает объект,
//       //который мы формируем внутри АС)
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountAC(totalCount)); //
//     },
//     toggleIsFetching: (isFetching) => {
//       dispatch(toggleIsFetchingAC(isFetching)); //отображение крутилки при загрузке
//     },
//   };
// };

//после того как стейт изменился, connect заново вызывает mapStateToProps, чтобы достать новые свежие пропсы из стора
// export default connect(mapStateToProps, {
//   follow: followAC,
//   unfollow: unfollowAC,
//   setUsers: setUsersAC,
//   setCurrentPage: setCurrentPageAC,
//   setTotalUsersCount: setTotalUsersCountAC,
//   toggleIsFetching: toggleIsFetchingAC,
// })(UsersComponent);

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
})(UsersComponent);
