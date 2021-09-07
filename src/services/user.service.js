import axios from "axios";
import { setUsers } from "../actions";
import { getToken } from "../auth/token";
import env from "../env";

export const loadUsers = async (dispatch) => {
    const token = getToken();
    const response = await axios.get(`${env.API_URL}/user/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if(dispatch) {
        dispatch(setUsers(response.data));
    }    
    console.log('Users loaded', response.data);
    return response.data;
};