import TaskPage from "../views/TaskPage.vue";
import HomePage from "../views/HomePage.vue";
import NotFound from "../views/NotFound.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        components: {
            default: HomePage,
            home: HomePage,
        },
    },
    {
        path: "/create-task",
        components: {
            default: TaskPage,
            createTask: TaskPage,
        },
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        components: {
            default: NotFound,
            notFound: NotFound,
        }
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history:createWebHashHistory(),
    routes,
});

export default router;
