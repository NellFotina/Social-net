export const required = (value) => {
  if (value) return undefined;
  return "Field is required";
};

//здесь замыкание: функция возвр-ет другую ф-цию, и эта другая ф-ция
//имеет доступ к данным родительской ф-ции
//мы не можем передать 2-м параметром длину строки, так как не мы будем вызывать
//функцию, а redux-form
//т.е мы, чтобы получить валидатор, мы должны вызвать maxLengthCreator, передав в нее
//нужную длину (maxLength) и нам вернется уникальный валидатор с уникальным внутри значением
export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
  return undefined;
};
