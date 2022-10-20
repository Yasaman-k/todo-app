import TaskPage from "../views/TaskPage.vue";
import HomePage from "../views/HomePage.vue";
import NotFoundPage from "../views/NotFound.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        components: {
            default: HomePage,
            home: HomePage,
        },
        meta: { title: 'TODO APP' }
    },
    {
        path: "/create-task",
        name: "CreateTask",
        components: {
            default: TaskPage,
            createTask: TaskPage,
        },
        meta: { title: 'Create Task' }
    },
    // this must be the last object
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        components: {
            default: NotFoundPage,
            notFound: NotFoundPage,
        },
        meta: { title: '404' }
    },
    // {
    //     path:"/:catchAll(.*)",
    //     redirect:"/not-found"
    // }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(to);
    document.title = to.meta.title;
    next();
  });

export default router;
