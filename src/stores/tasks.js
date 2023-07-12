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
                    // return response.data
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
})

        //  const data = await axios.get('http://localhost:3000/tasks')

        //  console.log(data);
        //  titleTasks.value = data.data
        //  return data.data
        // .then((response) => {
        //     // console.log(response.data);
        //     titleTasks.value = response.data
        //     return response.data
        //     // console.log(response.data);
        // })
        // .catch(e => {
        //     console.log(e);
        // })


        //     const x = fetch('http://localhost:3000/tasks', {
        //         method: 'GET',
        //         headers: {
        //             'content-type': 'application/json'
        //         }
        //     }).then(res => { return res.json() })
        //         .then(json =>
        //             titleTasks.value = json)
        //     return x
        // }

    