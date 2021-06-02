import * as axios from "axios";
import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/image/user_photo.png";

class Users extends React.Component {
  componentDidMount() {
    axios
      //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
      //и количество записей на 1 странице (count-название из документации)
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items); //засетаем данные в наш store (users-reducer.js)
        this.props.setTotalUsersCount(response.data.totalCount); //засетаем общее кол-во пользователей с сервера (в девтулзе смотрим на вкладке Network по первому запросу), далее прописываем его в UsersContainer
      });
  }
  //все колбеки приходят сюда из mapDispatchToProps
  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      //делаем get-запрос, запрашиваем текущую страницу (page-название из документации)
      //и количество записей на 1 странице (count-название из документации)
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items); //засетаем данные в наш store (users-reducer.js)
      });
  };

  render() {
    let pagesCount = this.props.totalUsersCount / this.props.pageSize; //вычисляем количество страниц
    let pages = []; // массив сначала пустой (количество страниц)
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i); //заполняем массив количеством страниц
    }

    return (
      <div>
        <div>
          {pages.map((p) => {
            //выводим массив на экран (отрисовуем)
            return (
              <span
                className={this.props.currentPage == p && styles.selectedPage} //выделяем текущую страницу
                onClick={(e) => {
                  this.onPageChanged(p); //onPageChanged не вызовется, пока не вызовется анонимная функция е, е вызовется при клике на span (е мы нигде не используем, но написали его тут для прозрачности - что это обработчик события)
                }}
              >
                {p}
              </span>
            );
          })}
        </div>
        {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.UserPhoto}
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
