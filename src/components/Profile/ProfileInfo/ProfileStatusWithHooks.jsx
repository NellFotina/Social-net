import React, { useState } from "react";

//Destructuring assignment - деструктурированное присваивание
// let a, b, rest;
//[a, b] = [10, 20]; //a = 10, b = 20
//[a, b, ...rest] = [10, 20, 30, 40, 50]; // a = 10, b = 20, rest = [30, 40, 50]

//let arr = [0, () = > {}]; // это справедливо для useState()
//let [a, setA] = arr;

const ProfileStatusWithHooks = (props) => {
  //useState возвращает массив из 2-х элементов:
  //1-й - значение, кот. хранится в state, 2-й - ф-ция, кот изменяет/устанавливает это одиночное значение
  //let stateWithSetState = useState(false);
  //let editMode = stateWithSetState[0]; // 1-й элемент
  //let setEditMode = stateWithSetState[1]; //2-й элемент
  // теперь запишем то же самое, но кратко:

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status); //инициализованное значение берем из props, а дальше значение будет то, которое мы будем сетать

  const activatedEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activatedEditMode}>
            {status || "Without status"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onFocus={handleFocus} //автовыделение содержимого инпута
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
