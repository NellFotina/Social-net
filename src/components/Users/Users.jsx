import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/image/user_photo.png";
import { NavLink } from "react-router-dom";
import { followApi } from "../../api/api";

let Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); //вычисляем количество страниц
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
              className={props.currentPage === p && styles.selectedPage} //выделяем текущую страницу
              onClick={(e) => {
                props.onPageChanged(p); //onPageChanged не вызовется, пока не вызовется анонимная функция е, е вызовется при клике на span (е мы нигде не используем, но написали его тут для прозрачности - что это обработчик события)
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  className={styles.UserPhoto}
                  alt=""
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.toggleFollowingProgress(true, u.id);
                    followApi.unfollowUser(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unfollow(u.id);
                      }
                      props.toggleFollowingProgress(false, u.id);
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.toggleFollowingProgress(true, u.id);
                    followApi.followUser(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        //сервер подтвердил, что подписка произошла
                        props.follow(u.id); //вызываем колбэк (задиспатчим в редьюсер)
                      }
                      props.toggleFollowingProgress(false, u.id);
                    });
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
};

export default Users;
