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
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersSelector,
} from "../../redux/users-selectors";

class UsersComponent extends React.Component {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }
  //все колбеки приходят сюда из mapDispatchToProps
  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
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
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     //здесь формируется наш state после объявления этих переменных
//     //в users-reducer, эти параметры отсюда приходят в компоненту Users в props
//     users: state.usersPage.users, //внедряет пользователей на нашу страничку (сначала это пустой массив из users-reducer)
//     pageSize: state.usersPage.pageSize, //количество записей на 1 странице
//     totalUsersCount: state.usersPage.totalUsersCount, //общее количество записей
//     currentPage: state.usersPage.currentPage, //текущая страница
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };
let mapStateToProps = (state) => {
  debugger;
  return {
    //здесь формируется наш state после объявления этих переменных
    //в users-reducer, эти параметры отсюда приходят в компоненту Users в props
    users: getUsersSelector(state), //внедряет пользователей на нашу страничку (сначала это пустой массив из users-reducer)
    pageSize: getPageSize(state), //количество записей на 1 странице
    totalUsersCount: getTotalUsersCount(state), //общее количество записей
    currentPage: getCurrentPage(state), //текущая страница
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  // withAuthRedirect, //если хотим защитить страничку от неавторизированного пользователя
  connect(mapStateToProps, { follow, unfollow, setCurrentPage, getUsers })
)(UsersComponent);
