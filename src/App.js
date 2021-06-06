import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
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

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={store.getState().sidebar} />
      <div className="app-wrapper-main">
        <Route path="/profile" render={() => <ProfileContainer />} />
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
      </div>
    </div>
  );
};

export default App;
