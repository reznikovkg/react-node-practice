const domain = 'http://localhost:8888';

const ApiList = {
    'auth_login': `${domain}/api/auth/login`,
    'auth_connect': `${domain}/api/auth/connect`,
    'auth_register': `${domain}/api/auth/register`,

    'business_allPlaces': `${domain}/api/business/allPlaces`,
    'business_sendPlaces': `${domain}/api/business/sendPlaces`,

    // 'register': {
    //     path: '/register',
    //     component: ''
    // },
};

export default ApiList;
