//про expect  https://jestjs.io/ru/docs/expect

import profileReducer, {
  addPostActionCreator,
  deletePostAC,
} from "./profile-reducer";

let state = {
  posts: [
    { id: 1, message: "Hi, how are you", likeCount: 5 },
    { id: 2, message: "It's my first post", likeCount: 15 },
  ],
};

it("message of new post should be correct", () => {
  //1. test data
  let action = addPostActionCreator("Hello, Nell");

  //2. action
  let newState = profileReducer(state, action);

  // 3. expectation - ожидание
  expect(newState.posts[2].message).toBe("Hello, Nell");
});

//тестируем редьюсер
it("length of posts should be incremented", () => {
  //1. test data
  let action = addPostActionCreator("Hello, Nell"); // формируем action и в него передаем придуманный текст

  //2. action
  let newState = profileReducer(state, action); //передаем в редьюсер старый стейт и экшн

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});

it("after deleting length of messages should be decrement", () => {
  //1. test data
  let action = deletePostAC(2);

  //2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(1);
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
  //1. test data
  let action = deletePostAC(1000);

  //2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(2);
});
