import Homepage from './components/pages/Homepage';

import Login from './components/pages/Login';
import Register from './components/pages/Register';

import Profile from './components/pages/Profile';

import PlacesList from './components/pages/places/List';

const RouterList = {
    'homepage': {
        path: '/',
        component: Homepage
    },
    'login': {
        path: '/login',
        component: Login
    },
    'register': {
        path: '/register',
        component: Register
    },

    'profile': {
        path: '/profile',
        component: Profile,
        access: 'all'
    },

    'businessPlaces': {
        path: '/business/places',
        component: PlacesList,
        access: 'business'
    }
};

export default RouterList;
