export const tabChanged = (index, history) => ({
    type: 'TAB_CHANGED',
    payload: { index, history },
})

export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: { users },
})

export const setChats = (chats) => ({
    type: 'SET_CHATS',
    payload: { chats },
})
export const setMessages = (messages) => ({
    type: 'SET_MESSAGES',
    payload: { messages },
})
export const messageReceived = (message) => ({
    type: 'MESSAGE_RECEIVED',
    payload: { message },
})