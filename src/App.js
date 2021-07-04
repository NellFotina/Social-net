import React from "react";
import "./App.css";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import UsersContainer from "./components/Users/UsersContainer";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import { Route } from "react-router";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login"; //eсли export default, значит import под любым именем
import { initializeAppThunk } from "./redux/app-reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { Component } from "react";
import { withSuspense } from "./hoc/withSuspense";

//import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
//import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends Component {
  catchAllUnhandleErrors = (reason, promise) => {
    alert("Some error occured");
  };
  componentDidMount() {
    //initializeAppThunk сначала проверяет авторизацию, потом ставит флаг инициализации
    this.props.initializeAppThunk();
    //подписка на window. - side-effect, нереактовское поведение, подписка на глобальное событие
    //отлаваливаем ошибки валидации - подписываемся на событие unhandledrejection;
    //2-й вариант - можно сделать локальный обработчик событий в санке (try - catch)
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
  }
  //если мы подписались на глобальное событие, мы обязательно должны отписаться, когда компонента умрет
  componentDidUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandleErrors
    );
  }

  render() {
    //если мы непроинициализированы - показываем крутилку
    //(иначе асинхронные запросы будут выполняться с разной задержкой
    //и будут в результате этого прогружаться ненужные страницы)
    if (!this.props.initialized) {
      return <Preloader />;
    }
    //если проинициализированы - отрисовываем все остальное
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar state={store.getState().sidebar} />
        <div className="app-wrapper-main">
          {/* <Route path="/profile/:userId?" render={() => <ProfileContainer />} /> */}

          {/* Вместо обычной отрисовки <DialogsContainer />, сделаем отрисовку с задержкой */}
          {/* Чтобы сократить повторяющийся код, сделаем НОС withSuspense */}
          <Route
            path="/profile/:userId?"
            render={withSuspense(ProfileContainer)}
          />

          {/* <Route path="/dialogs" render={() => <DialogsContainer />} /> */}

          {/* Вместо обычной отрисовки <DialogsContainer />, сделаем отрисовку с задержкой */}

          {/* <Route
            path="/dialogs"            
            render={() => {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  <DialogsContainer />
                </Suspense>
              );
            }}
          /> */}

          {/* Чтобы сократить повторяющийся код, сделаем НОС withSuspense */}
          <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
          <Route
            exact
            path="/friends"
            render={() => <Friends state={store.getState().sidebar} />}
          />
          <Route path="/login" render={() => <LoginPage />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //чтобы в state реально был .app - нам этот редьюсер нужно не забыть закомбайнить в redux-store.jx
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter, //раньше сбивалась работа <Route />, когда connect компоненту, поэтому здесь withRouter - вроде этот баг уже пофиксили, но все равно оставим
  connect(mapStateToProps, { initializeAppThunk })
)(App);

const SamuraiJSApp = (props) => {
  return (
    // process(глобальный объект в node.js).env(окружение).PUBLIC_URL(для локалки будет пусто) - настройка окружения,
    //для того, чтобы работал deploy не только с локалки, но и с хостинга
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJSApp;
