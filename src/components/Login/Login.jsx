//Наша форма конечная LoginForm вызвала handleSubmit (его прокидывает в пропсы контейнерная
//компонента LoginReduxForm - она образуется с помощью reduxForm). А в LoginReduxForm пропсы
//передаются атрибутом с данными (formData), собранными для нас контейнерной компонентой
//с помощью reduxForm (накопили какие-то данные, которые при нажатии на <button>
//при Submite получили в нашем колбеке в Login: const onSubmit = (formData) ...)

import React from "react";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators";
import { createField, Input } from "../common/FormsControl/FormsControl";
import { LoginThunk } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import style from "../common/FormsControl/FormsControle.module.css";

//саму форму вынесем в отдельную компоненту

//деструктуризация параметров в скобках:
// const LoginForm = (props) => {
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    // <form> - обязательно,
    //Field - вместо input, автоматом реагируют на onChange

    //деструктуризация
    // <form onSubmit={props.handleSubmit}>
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {
        type: "password",
      })}
      {createField(
        null,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "remember me"
      )}

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl &&
        createField("Symbol from image", "captch", [required], Input)}

      {/* деструктуризация 
      {props.error && (
        //этот тег появляется только, когда есть ошибка в заполнении поля
        <div className={style.formSummaryError}>{props.error}</div>
      )} */}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

// "login" - уникальное имя для формы
// form - этот form никак не связан с form из redux-store.js
// reduxForm - прокидывает в нашу форму особый колбек handleSubmit, который собирает все данные в форме,
// эти данные внутри него упаковываются в объект. reduxForm не перерисовывает форму после нажатия на кнопку Отправить
//он передает в нее метод onSubmit (formData)
const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  //(formData) - СЮДА ПРИДУТ ВСЕ ЗНАЧЕНИЯ (данные из формы), можем их теперь диспатчить в санку
  const onSubmit = (formData) => {
    //чтобы проверить данные в форме, введем в консоли: store.getState().form
    //console.log(formData);
    props.LoginThunk(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captchaUrl
    );
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { LoginThunk })(Login);
