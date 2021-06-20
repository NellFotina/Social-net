import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import { Route } from "react-router";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import store from "./redux/redux-store";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login"; //eсли export default, значит import под любым именем
import { initializeAppThunk } from "./redux/app-reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import Preloader from "./components/common/Preloader/Preloader";
import { Component } from "react";

class App extends Component {
  componentDidMount() {
    //initializeAppThunk сначала проверяет авторизацию, потом ставит флаг инициализации
    this.props.initializeAppThunk();
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
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />
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

export default compose(
  withRouter, //раньше сбивалась работа <Route />, когда connect компоненту, поэтому здесь withRouter - вроде этот баг уже пофиксили, но все равно оставим
  connect(mapStateToProps, { initializeAppThunk })
)(App);
