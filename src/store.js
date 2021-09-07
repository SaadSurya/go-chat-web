import { createStore, combineReducers } from "redux";
import * as reducers from './reducers';
import { loadChats } from "./services/chat.service";
import { loadUsers } from "./services/user.service";


const rootReducer = combineReducers({
    selectedTabIndex: reducers.tabChangedReducer,
    users: reducers.setUsersReducer,
    chats: reducers.setChatsReducer,
    messages: reducers.setMessagesReducer,
});


const store = createStore(rootReducer);
(() => {
    //loadUsers(store.dispatch);
    //loadChats(store.dispatch);
})();

export { store };