<template>
    <div class="container">
        <div class="">
            <div class="button-group">
                <button class="title2" @click="removeAllTasks">remove all tasks</button>
                <button class="title2" @click="markAllDone">Mark all Done</button>
            </div>
            <ul>
                {{  titleTasks?.[0]?.done }}
                <li v-for="todo in titleTasks" :key="todo.id">
                    <div>
                        <input type="checkbox" @click="toggleDone(todo)" />
                        <p :class="{ done: todo.done }">{{ todo.content }}</p>
                        <p :class="{ done: todo.done }">{{ todo.date }}</p>
                        <p :class="{ done: todo.done }">{{ todo.category }}</p>
                        <button class="delete" @click="confirmDelete">
                            <img src="../assets/img/eraser-64.png">
                        </button>
                        <button class="edit">
                            <img src="../assets/img/pencil-96.png">
                        </button>
                      <Timer :taskId="todo.id"/>
                    </div>
                </li>
            </ul>
        </div>
       
    </div>
    <div>
            <!-- <p class="section2">click to show yearly tasks</p> -->
            <Calendar />
        </div>
</template>


<style scoped>
.container {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
}

.delete {
    margin-left: 20px;
    cursor: pointer;
}

.edit {
    margin-left: 20px;
    cursor: pointer;
}

.edit img {
    width: 36px;
    height: auto;
}

.delete img {
    width: 36px;
    height: auto;
}

.button-group {
    display: flex;
    justify-content: end;
}
</style>

<script setup>
import Timer from '../components/Timer.vue'
import Calendar from '../components/Calendar.vue'
import { onMounted, ref } from 'vue';
// import ConfirmDelete from '@/components/DeleteModal.vue'


const titleTasks = ref([])

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
const toggleDone = (todo) => {
    todo.done = !todo.done;
}
// remove just delete it here but keep exist it,delete means delete it completely
// const deleteTask = (id) => {
//     const index = titleTasks.value.findIndex(x => x.id === id)
//     titleTasks.value.splice(index, 1)
//     deleteData(url, id)
// }

function markAllDone() {
    titleTasks.value.forEach((todo) => {
        todo.done = true
    })
}

function removeAllTasks() {
    // titleTasks.value = [];
    titleTasks.value.length = 0;
}
// const deleteData = async (url = '', id) => {
//     const response = await fetch(url + '/' + id, {
//         method: 'DELETE',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         redirect: 'follow',
//         referrerPolicy: 'no-referrer',
//         // body: JSON.stringify(data)
//     })
//     return response.json()
// }

// const confirmDelete = () => {
//     // model opens
//     // deleteTask(todo.id)
// }
</script>