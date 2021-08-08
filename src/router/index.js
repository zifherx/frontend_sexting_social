import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import ForgotPassword from '../views/ForgotPassword'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/forgot-password',
        name: 'Recuperar Cuenta',
        component: ForgotPassword
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
            import ('@/views/Dashboard'),
        meta: { isAuthenticated: true },
        children: [
            //Vista Principal
            {
                name: 'Dashboard',
                path: '',
                component: () =>
                    import ('@/views/dashboard/Principal')
            },
            //Lista Usuarios
            {
                name: 'Menu Usuarios',
                path: '/users',
                component: () =>
                    import ('@/views/dashboard/listUsers')
            },
            //Perfil
            {
                name: 'Perfil',
                path: '/profile',
                component: () =>
                    import ('@/views/dashboard/Perfil')
            },
            //Chat
            {
                name: 'Chat',
                path: '/chat',
                component: () =>
                    import ('@/views/dashboard/Chat')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const autorizacion = to.matched.some(a => a.meta.isAuthenticated)
    const userOnline = localStorage.getItem('data-token')

    if (autorizacion && !userOnline) {
        next({ name: 'Login' })
    } else if (!autorizacion && userOnline) {
        next({ name: 'Dashboard' })
    } else {
        next()
    }
})

export default router