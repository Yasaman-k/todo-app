<template>
    <div class="container">
        <div>
            <p class="section2">click to show yearly tasks</p>
        </div>
        <div class="section-right">
            <button class="title2" @click="removeAllTasks">remove all tasks</button>
            <button class="title2" @click="markAllDone">Mark all Done</button>
            <ul>
                <li v-for="todo in titleTasks" :key="todo.id">
                    <div>
                        <input type="checkbox" @click="toggleDone(todo)" />
                        <h3 :class="{done : todo.done}">{{todo.content}}</h3>
                        <h3 :class="{done : todo.done}">{{todo.date}}</h3>
                        <h3 :class="{done : todo.done}"> // {{todo.category}}</h3>
                        <button class="delete" @click="deleteTask(todo.id)">🚮</button>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>


<style scoped>
.container {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
}

.section-right {
align-items: flex-end;
}
</style>

<script >
import { onMounted, ref } from 'vue';


export default {
    setup() {
        const titleTasks = ref([])
        const url = 'http://localhost:3000/tasks'

        const fetchData = () => {
            const x = fetch('http://localhost:3000/tasks', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => { return res.json() })
                .then(json =>
                    titleTasks.value = json)

            return x
        }

        onMounted(() => {
            fetchData()
        })


        // to done the task
        function toggleDone(todo) {
            todo.done = !todo.done;
        }
        // remove just delete it here but keep exist it,delete means delete it completely
        function deleteTask(id) {
            const index = titleTasks.value.findIndex(x => x.id === id)
            titleTasks.value.splice(index, 1)
            deleteData(url, id)
        }

        function markAllDone() {
            titleTasks.value.forEach((todo) => {
                todo.done = true
            })
        }

        function removeAllTasks() {
            // titleTasks.value = [];
            titleTasks.value.length = 0;
        }
        const deleteData = async (url = '', id) => {
            const response = await fetch(url + '/' + id, {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                // body: JSON.stringify(data)
            })
            return response.json()
        }
        return {
            titleTasks,
            toggleDone,
            deleteTask,
            markAllDone,
            removeAllTasks,
        }
    }
}




</script>