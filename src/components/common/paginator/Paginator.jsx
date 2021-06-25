import React from "react";
import styles from "./Paginator.module.css";

let Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize); //вычисляем количество страниц
  let pages = []; // массив сначала пустой (количество страниц)

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i); //заполняем массив количеством страниц
  }
  return (
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
  );
};

export default Paginator;
