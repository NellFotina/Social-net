const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
    // {type: 'ADD-POST'}
    if (action.type === ADD_POST) {
      let newPost = {
        id: 3,
        message: this._state.profilePage.newPostText,
        likeCount: 0,
      };

      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_POST_TEXT) {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => {  
  return {
    type: ADD_POST
  }
}

export const updateNewPostTextActionCreator = (text) => {  
  return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export default store;
window.store = store;
// store - OOP
