import { defineStore } from 'pinia'
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
    }),
    getters: {
        getTasks(state) {
            return state.tasks
        }
    },
    actions: {
        fetchTasks() {
            axios.get('http://localhost:3000/tasks')
                .then((response) => {
                    // console.log(response.data);
                    // console.log(response.data);
                    this.tasks = response.data
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
})