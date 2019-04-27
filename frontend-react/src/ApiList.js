const domain = 'http://localhost:8888';

const ApiList = {
    'auth_login': {
        path: `${domain}/api/auth/login`,
    },
    'auth_connect': {
        path: `${domain}/api/auth/connect`,
    },
    'auth_register': {
        path: `${domain}/api/auth/register`,
    },
    // 'login': {
    //     path: '/login',
    //     component: Login
    // },
    // 'register': {
    //     path: '/register',
    //     component: ''
    // },
};

export default ApiList;
