import axios from "axios";
import { messageReceived, setMessages } from "../actions";
import { getToken } from "../auth/token";
import env from "../env";

export const loadMessages = async (dispatch, ofUser) => {
    const token = getToken();
    const response = await axios.get(`${env.API_URL}/message/retrieve?ofUser=${ofUser}&before=${''}&limit=20`, {

        headers: {
            Authorization: `Bearer ${token}`
        },

    });
    if(dispatch) {
        dispatch(setMessages(response.data));
    }
    console.log('Messages loaded', response.data);
    return response.data;
};

export const sendMessage = async (dispatch, from, to, text) => {
    const token = getToken();
    const response = await axios.post(`${env.API_URL}/message/send`, {
        from, to, text
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        },

    });
    if(response.status === 200) {
        //loadMessages(dispatch, to);
        dispatch(messageReceived(response.data));
        return true;
    }
    return false;
}