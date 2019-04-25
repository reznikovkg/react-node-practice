import Cookies from 'js-cookie';

let userToken = Cookies.get('user_token');

if (!userToken) {
    userToken = null;
}

export default {
    userReducer: {
        userToken: userToken,
        userData: {}
    }
};