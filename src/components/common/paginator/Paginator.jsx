import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

let Paginator = (props, { portionSize = 9 }) => {
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize); //вычисляем количество страниц
  let pages = []; // массив сначала пустой (количество страниц)

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i); //заполняем массив количеством страниц
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1); //хук вместо классовой компоненты
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  let leftPortionPageNumberEnd = pagesCount - portionSize - 1;

  debugger;
  return (
    <div div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter(
          (p) =>
            p >= leftPortionPageNumber &&
            p <= rightPortionPageNumber &&
            p < leftPortionPageNumberEnd
        )
        .map((p) => {
          //выводим массив на экран (отрисовуем)
          return (
            <span
              className={cn(
                //чтобы cn работал, установим библиотеку: npm i classnames --save
                {
                  [styles.selectedPage]: props.currentPage === p,
                },
                styles.pageNumber
              )}
              //или так:
              //{`${currentPage === p ? styles.selectedPage : styles.noSelectedPage }`}
              key={p}
              onClick={(e) => {
                props.onPageChanged(p); //onPageChanged не вызовется, пока не вызовется анонимная функция е, е вызовется при клике на span (е мы нигде не используем, но написали его тут для прозрачности - что это обработчик события)
              }}
            >
              {p}
            </span>
          );
        })}
      {!(leftPortionPageNumberEnd - rightPortionPageNumber <= 1) && (
        <span>***</span>
      )}
      {pages
        .filter((p) => p >= leftPortionPageNumberEnd && p <= pagesCount)
        .map((p) => {
          return (
            <span
              className={cn(
                //чтобы cn работал, установим библиотеку: npm i classnames --save
                {
                  [styles.selectedPage]: props.currentPage === p,
                },
                styles.pageNumber
              )}
              //или так:
              //{`${currentPage === p ? styles.selectedPage : styles.noSelectedPage }`}
              key={p}
              onClick={(e) => {
                props.onPageChanged(p); //onPageChanged не вызовется, пока не вызовется анонимная функция е, е вызовется при клике на span (е мы нигде не используем, но написали его тут для прозрачности - что это обработчик события)
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber &&
        !(leftPortionPageNumberEnd - rightPortionPageNumber <= 1) && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          >
            NEXT
          </button>
        )}
    </div>
  );
};

export default Paginator;
