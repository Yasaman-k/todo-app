import TaskPage from "../views/TaskPage.vue";
import HomePage from "../views/HomePage.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/create-task",
        component: TaskPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history:createWebHashHistory(),
    routes,
});

export default router;
