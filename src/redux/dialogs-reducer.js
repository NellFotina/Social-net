const SEND_MESSAGE = "dialogsPage/SEND_MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  //debugger;
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };

    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
