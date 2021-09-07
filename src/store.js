import { createStore, combineReducers } from "redux";
import * as reducers from './reducers';

const rootReducer = combineReducers({
    selectedTabIndex: reducers.tabChangedReducer,
    users: reducers.setUsersReducer,
    chats: reducers.setChatsReducer,
    messages: reducers.setMessagesReducer,
});

const store = createStore(rootReducer);

export { store };