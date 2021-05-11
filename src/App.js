import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";
import { Route } from "react-router";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import store from "./redux/redux-store";

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={store.getState().sidebar} />
      <div className="app-wrapper-main">
        <Route
          path="/profile"
          render={() => <Profile />}
        />
        <Route
          path="/dialogs"
          render={() => <DialogsContainer />}
        />
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
