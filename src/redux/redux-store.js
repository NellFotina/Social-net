import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./users-reducer";
import thunkMiddleWare from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare))
);

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

// window.store = store; //чтоб просматривать store в консоли
window.__store__ = store; //чтоб не затереть что-то в глобальном store

export default store;
