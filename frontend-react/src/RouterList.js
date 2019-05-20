import Homepage from './components/pages/Homepage';

import Login from './components/pages/auth/Login';
import Activate from './components/pages/auth/Activate';
import Register from './components/pages/auth/Register';

import Profile from './components/pages/Profile';

import Places from './components/pages/places/Places';
import Place from "./components/pages/places/Place";
import PlaceStat from "./components/pages/places/PlaceStat";
import Users from "./components/pages/Users";

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

    'placeStat': {
        path: '/place-stat/:id',
        pathWithParams: (id) => {
            return `/place-stat/${id}`
        },
        component: PlaceStat,
        access: 'business'
    },

    'places': {
        path: '/places',
        component: Places,
        access: 'all'
    },


    'users': {
        path: '/users',
        component: Users,
        access: 'admin'
    }
};

export default RouterList;
