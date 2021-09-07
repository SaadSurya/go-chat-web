import axios from "axios";
import { setChats } from "../actions";
import { getToken } from "../auth/token";
import env from "../env";

export const loadChats = async (dispatch) => {
    const token = getToken();
    const response = await axios.get(`${env.API_URL}/chat/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if(dispatch) {
        dispatch(setChats(response.data));
    }
    console.log('Chats loaded', response.data);
    return response.data;
};