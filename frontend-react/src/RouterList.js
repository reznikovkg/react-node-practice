import Homepage from './components/pages/Homepage';

import Login from './components/pages/auth/Login';
import Activate from './components/pages/auth/Activate';
import Register from './components/pages/auth/Register';

import Profile from './components/pages/Profile';

import Places from './components/pages/places/Places';
import Place from "./components/pages/places/Place";

const RouterList = {
    'homepage': {
        path: '/',
        component: Homepage
    },
    'login': {
        path: '/login',
        component: Login
    },
    'active': {
        path: '/active',
        component: Activate
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

    'place': {
        path: '/place/:id',
        pathWithParams: (id) => {
            return `/place/${id}`
        },
        component: Place,
        access: 'all'
    },

    'places': {
        path: '/places',
        component: Places,
        access: 'all'
    }
};

export default RouterList;
