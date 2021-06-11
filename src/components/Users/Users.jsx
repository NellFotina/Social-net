import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/image/user_photo.png";
import { NavLink } from "react-router-dom";
import * as axios from "axios";

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
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  onClick={() => {
                    axios
                      .delete(
                        `https://social-network.samuraijs.com/api/1.0//follow/${u.id}`,
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "73c522ff-bfdb-4f88-bb6e-58eae3d6e793",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.unfollow(u.id);
                        }
                      });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Мы с вами реализовали полписку и отписку. Но... Не до конца! Вся логика наша свелась к просто изменению стейта redux при нажатии на кнопки. А нам ведь нужно на сервер запрос отправить.

                    // Сценарий такой:
                    // 1. кликаем на кнопку подписаться
                    // 2. шлём запрос на сервак
                    // 3. сервак говорит: всё ок, подписались
                    // 4. после этого только диспатчим экшен в стор
                    // Летим!!!
                    axios
                      .post(
                        `https://social-network.samuraijs.com/api/1.0//follow/${u.id}`,
                        [],
                        {
                          withCredentials: true,
                          headers: {
                            "API-KEY": "73c522ff-bfdb-4f88-bb6e-58eae3d6e793",
                          },
                        }
                      )
                      .then((response) => {
                        if (response.data.resultCode === 0) {
                          props.follow(u.id);
                        }
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
