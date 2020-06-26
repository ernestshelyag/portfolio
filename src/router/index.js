import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../pages/Main.vue'),
        children: [
            {
                path: '/about',
                name: 'About',
                component: () => import('../pages/About.vue')
            },
            {
                path: '/contacts',
                name: 'Contacts',
                component: () => import('../pages/Contacts.vue')
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
