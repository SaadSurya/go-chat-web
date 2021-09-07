
const navigateToTab = (index, history) => {
    if (!history) return;
    switch (index) {
        case 0:
            history.push('/');
            break;
        case 1:
            history.push('/users');
            break;
        case 2:
            history.push('/login');
            break;
        case 3:
            history.push('/settings');
            break;
        default:
            history.push('/');
    }
}
export const tabChangedReducer = (state = 0, action) => {
    switch (action.type) {
        case 'TAB_CHANGED': {
            navigateToTab(action.payload.index, action.payload.history)
            return action.payload.index;
        }
        default:
            return state;
    }
}
export const setUsersReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USERS': {
            return action.payload.users;
        }
        default:
            return state;
    }
}
export const setChatsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CHATS': {
            return action.payload.chats;
        }
        case 'MESSAGE_RECEIVED': {
            let message = action.payload.message;
            let chat = state[message.from] || state[message.to];
            chat.from = message.from; chat.to = message.to; chat.text = message.text;
            chat.lastMessagedAt = message.CreatedAt;
            return state;
        }
        default:
            return state;
    }
}
export const setMessagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MESSAGES': {
            return action.payload.messages;
        }
        case 'MESSAGE_RECEIVED': {
            return [...state, action.payload.message];
        }
        default:
            return state;
    }
}