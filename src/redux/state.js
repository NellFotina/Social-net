import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebarReducer";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you", likeCount: 5 },
        { id: 2, message: "It's my first post", likeCount: 15 },
      ],
      newPostText: "it-kamasutra",
    },
    dialogsPage: {
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo" },
      ],
      dialogs: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Nel" },
        { id: 3, name: "Yura" },
        { id: 4, name: "Oleg" },
        { id: 5, name: "Natasha" },
      ],
      newMessageBody: ""
    },
    sidebar: {
      friends: [
        { id: 1, name: "Kolya" },
        { id: 2, name: "Yana" },
        { id: 3, name: "Evgen" },
      ],
    },
  },
  _callSubscriber() {
    console.log("state changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    
    this._callSubscriber(this._state);
  },
};


export default store;
window.store = store;
// store - OOP
