const domain = 'http://localhost:8888';

const ApiList = {
    'auth_login': `${domain}/api/auth/login`,
    'auth_connect': `${domain}/api/auth/connect`,
    'auth_register': `${domain}/api/auth/register`,

    'default_saveReview': `${domain}/api/default/saveReview`,

    'business_createPlaces': `${domain}/api/business/createPlaces`,
    'business_removePlaces': `${domain}/api/business/removePlaces`,

    'places_getPlaces': `${domain}/api/places/getPlaces`,
    'places_getPlace': `${domain}/api/places/getPlace`,

    'review_removeReview': `${domain}/api/reviews/removeReview`,

    // 'register': {
    //     path: '/register',
    //     component: ''
    // },
};

export default ApiList;
