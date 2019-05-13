const domain = 'http://localhost:8888';

const ApiList = {
    'auth_login': `${domain}/api/auth/login`,
    'auth_connect': `${domain}/api/auth/connect`,
    'auth_register': `${domain}/api/auth/register`,

    'default_saveReview': `${domain}/api/default/saveReview`,

    'business_createPlaces': `${domain}/api/business/createPlaces`,
    'business_removePlaces': `${domain}/api/business/removePlaces`,

    'admin_removePlaces': `${domain}/api/admin/removePlaces`,
    'admin_removeReview': `${domain}/api/admin/removeReview`,
    'admin_generatedPlaces': `${domain}/api/admin/generatedPlaces`,
    'admin_generatedUsers': `${domain}/api/admin/generatedUsers`,

    'admin_getUsers': `${domain}/api/admin/getUsers`,
    'admin_removeUser': `${domain}/api/admin/removeUser`,

    'places_getPlaces': `${domain}/api/places/getPlaces`,
    'places_getPlace': `${domain}/api/places/getPlace`,

    'review_removeReview': `${domain}/api/reviews/removeReview`,
    'review_getReviews': `${domain}/api/reviews/getReviews`,
};

export default ApiList;
