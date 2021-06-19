//Наша форма конечная LoginForm вызвала handleSubmit (его прокидывает в пропсы контейнерная
//компонента LoginReduxForm - она образуется с помощью reduxForm). А в LoginReduxForm пропсы
//передаются атрибутом с данными (formData), собранными для нас контейнерной компонентой
//с помощью reduxForm (накопили какие-то данные, которые при нажатии на <button>
//при Submite получили в нашем колбеке в Login: const onSubmit = (formData) ...)

import React from "react";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators";
import { Input } from "../common/FormsControl/FormsControl";
import { LoginThunk } from "../../redux/auth-reducer";
import { connect } from "react-redux";

//саму форму вынесем в отдельную компоненту
const LoginForm = (props) => {
  return (
    // <form> - обязательно,
    //Field - вместо input, автоматом реагируют на onChange
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          component={Input}
          type={"password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field component={Input} name={"rememberMe"} type={"checkbox"} />
        remember me
      </div>

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
    props.LoginThunk(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { LoginThunk })(Login);
