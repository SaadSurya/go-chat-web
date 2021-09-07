export const useToken = () => {
    const token = getToken();
    const setToken = (token) => {
        localStorage.setItem('token', token);
    }
    let claims = getClaims();
    return [token, setToken, claims];
}
export const getToken = () => {
    return localStorage.getItem('token');
}
export const getClaims = () => {
    let claims = {}, token = getToken();
    if(token) {
        let tokenClaims = Buffer.from(token.split('.')[1], 'base64');
        tokenClaims = new TextDecoder().decode(tokenClaims);
        claims = JSON.parse(tokenClaims);
    }
    return claims;
}