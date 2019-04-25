import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';

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
        component: ''
    },
};

export default RouterList;
