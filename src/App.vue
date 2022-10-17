<template>
  <img src="./assets/img/icons8-todo-list-100.png" />
  <div class="container">
    <!-- preventDefault for not refreshing page after submit-->
    <form @submit.prevent="saveNewTask">
      <header>
        <h2 class="title2">Create Task</h2>
        <button type="submit" class="title2">Done</button>
        <button class="title2" type="reset">clear</button>
      </header>

      <div class="task-detail">
        <input v-model="newTask" placeholder="Add Title ... " type="text" />
        <textarea placeholder="Add Note ... " />
        <select v-model="selected">
          <option selected value="" :key="0">Please select one ...</option>
          <option v-for="(cat) in categoriesData" :key="cat.id" :value="cat.title">
            {{cat.title}}
          </option>
        </select>
      </div>
    </form>
    <h1 class="title2">tasks :</h1>
    <button class="title2" @click="removeAllTasks">remove all tasks</button>
    <button class="title2" @click="markAllDone">Mark all Done</button>
    <ul>
      <li v-for="(todo) in titleTasks" :key="todo.id">
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
  <form @submit.prevent="addCategory">
    <button class="title2">add category</button>
    <input type="text" v-model="newCategory" />
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {

    const selected = ref('')
    const newTask = ref('');
    const newCategory = ref('');
    const titleTasks = ref([]);
    const categories = ref([])
    const url = 'http://localhost:3000/tasks'

    const saveNewTask = async () => {
      titleTasks.value.push({
        date: new Date().toDateString(),
        done: false,
        content: newTask.value,
        category: selected.value
      });
      // save data
      postData('http://localhost:3000/tasks', {
        date: new Date().toDateString(),
        done: false,
        content: newTask.value,
        category: selected.value
      })
      // .then((data) => {
      // })

      newTask.value = ''; // to clearing input after submit form
    }

    const postData = async (url = '', data = {}) => {
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
      deleteTask,
      markAllDone,
      removeAllTasks,
      newCategory,
      addCategory,
      categories,
      selected
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
    // .catch((err) => {
    //   console.log(err);
    // })

    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => {
        this.categories = data
      })
    // .catch((err) => {
    // })

  }
}
</script>

<!-- style css-->
<style>
.delete {
  margin-left: 20px;
  cursor: pointer;
}

.container {
  margin: 1rem 1rem;
}

.title2 {
  display: inline;
  padding: 5px 16px;
  border-bottom: 5px solid rgb(95, 102, 15);
  border-radius: 10px;
  text-shadow: 2px 2px rgb(103, 103, 10);
  color: rgba(255, 255, 0, 0.514);
  box-shadow: 0px 0px 3px 3px rgb(69, 73, 6);
  cursor: pointer;
  background-color: rgb(214, 214, 140);
}

.title2:hover {
  background-color: rgb(215, 215, 41);
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

button {
  font-weight: 700;
  font-size: 24px;
}

li h3 {
  margin-left: 10px;
}

li div {
  display: flex;
  align-items: center;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.done {
  text-decoration: line-through;
}
</style>