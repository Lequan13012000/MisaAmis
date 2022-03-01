import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Createv2 from "../views/Createv2.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/storage",
        name: "Home",
        component: Home,
    },
    // {
    //     path: "/storage/createv2",
    //     name: "Createv2",
    //     component: Createv2,
    // },
    {
        path: "/storage/:id",
        name: "Createv2",
        component: Createv2,
    },
    {
        path: "/",
        name: "Createv2",
        component: Createv2,
        redirect: '/storage'
    },



];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;