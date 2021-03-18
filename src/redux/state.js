import { rerenderEntireTree } from "../render";

let state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, how are you", likeCount: 5 },
      { id: 2, message: "It's my first post", likeCount: 15 },
    ],
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
};

export let addPost = (postMessage) => {

  
  let newPost = {
    id: 3,
    message: postMessage,
    likeCount: 0
  };

  state.profilePage.posts.push(newPost);
 rerenderEntireTree(state);
}

export default state;
