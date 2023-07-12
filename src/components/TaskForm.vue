<template>
    <div>
        <!-- preventDefault for not refreshing page after submit-->
        <form @submit.prevent="saveNewTask">
            <div class="task-detail">
                <input v-model="newTask" placeholder="Add Title ... " type="text" />
                <textarea placeholder="Add Note ... " />

                <select v-model="selected">
                    <option selected value="" :key="0">Please select one ...</option>
                    <option v-for="(cat) in categoriesData" :key="cat.id" :value="cat.title">
                        {{ cat.title }}
                    </option>
                </select>
                <select v-model="selectedCat">
                    <option selectedCat value="" :key="0">Please select one ...</option>

                    <option v-for="(cat, index) in mainCategoriesData" :key="index" :value="cat">
                        {{ cat }}
                    </option>
                </select>
                <div class="button-group">
                    <button type="submit" class="title2">Done</button>
                    <button class="title2" type="reset">clear</button>
                </div>
            </div>
        </form>
        <!-- tasks -->

    </div>
    <form @submit.prevent="addCategory">
        <button class="title2">add category</button>
        <input type="text" v-model="newCategory" />
    </form>
</template>

<script >
import { ref } from 'vue';
export default {
    setup() {
        const mainCategoriesData = [
            "Habit", "Normal", "daily", "yearly"
        ]
        const selected = ref('')
        const selectedCat = ref('')
        const newTask = ref('');
        const newCategory = ref('');
        const titleTasks = ref([]);
        const categories = ref([])
        // const url = 'http://localhost:3000/tasks'

        const saveNewTask = async () => {
            titleTasks.value.push({
                date: new Date().toDateString(),
                done: false,
                content: newTask.value,
                category: selected.value,
                mainCategory: selectedCat.value
            });
            // save data
            postData('http://localhost:3000/tasks', {
                date: new Date().toDateString(),
                done: false,
                content: newTask.value,
                category: selected.value,
                mainCategory: selectedCat.value
            })

            // if (selectedCat.value === 'daily') {
            //   for (let index = 1; index < 32; index++) {
            //     patchData(`http://localhost:3000/task/`, {
            //        "tir1402-1":{
            //         subTitle:"..editable",
            //        }
            //     })
                
            //   }
            // }
            newTask.value = ''; // to clearing input after submit form
        }

        const postData = async (url = '', data = {}) => {
            console.log(data);
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            })
            return response.json()
        }

        const patchData = async (url = '', data = {}) => {
            const response = await fetch(url, {
                method: 'PATCH',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            })
            return response.json()
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

        // to done the task
        function toggleDone(todo) {
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

        const addCategory = () => {
            // categories.value.push({
            //   tilte: newCategory.value
            // })
            postData('http://localhost:3000/categories', {
                title: newCategory.value
            })
        }

        return {
            saveNewTask,
            newTask,
            titleTasks,
            toggleDone,
            markAllDone,
            newCategory,
            addCategory,
            categories,
            selected,
            mainCategoriesData,
            selectedCat
        }
    },
    methods: {
        fetchPosts() {
            fetch("http://localhost:3000/categories")
                .then(response => response.json())
                .then(data => (this.categoriesData = data));
        },
    },
    data() {
        return {
            categoriesData: []
        };
    },
    mounted() {
        this.fetchPosts();
        fetch('http://localhost:3000/tasks')
            .then((res) => res.json())
            .then((data) => {
                this.titleTasks = data
            })

        fetch('http://localhost:3000/categories')
            .then((res) => res.json())
            .then((data) => {
                this.categories = data
            })
    }
}
</script>

<style scoped>
.container {
    margin: 1rem 1rem;
}

.task-detail {
    display: flex;
    flex-direction: column;
    width: 70%;
}

.task-detail * {
    margin-top: 2rem;
}

textarea {
    height: 10rem;
    resize: none;
}
</style>