import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  getUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersComponent extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);

    // this.props.toggleIsFetching(true);
    // usersAPI
    //   .getUsers(this.props.currentPage, this.props.pageSize)
    //   .then((data) => {
    //     this.props.toggleIsFetching(false);
    //     this.props.setUsers(data.items); //засетаем данные в наш store (users-reducer.js)
    //     this.props.setTotalUsersCount(data.totalCount); //засетаем общее кол-во пользователей с сервера (в девтулзе смотрим на вкладке Network по первому запросу), далее прописываем его в UsersContainer
    //   });
  }
  //все колбеки приходят сюда из mapDispatchToProps
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);

    // this.props.toggleIsFetching(true);
    // this.props.setCurrentPage(pageNumber);
    // usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
    //   this.props.toggleIsFetching(false);
    //   this.props.setUsers(data.items); //засетаем данные в наш store (users-reducer.js)
    // });
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
          // toggleFollowingProgress={this.props.toggleFollowingProgress}
          followingInProgress={this.props.followingInProgress}
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
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  getUsers,
})(UsersComponent);
