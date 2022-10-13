<template>
  <img src="./assets/img/icons8-todo-list-100.png" />
  <div class="container">
    <!-- preventDefault for not refreshing page after submit-->
    <form @submit.prevent="saveNewTask">
      <header>
        <h2 class="title2">Create Task</h2>
        <button class="title2">Done</button>
      </header>

      <div class="task-detail">
        <input v-model="newTask" placeholder="Add Title ... " type="text" />
        <textarea placeholder="Add Note ... " />
      </div>
    </form>
    <h1 class="title2">tasks :</h1>
    <button class="title2" @click="removeAllTasks">remove all tasks</button>
    <button class="title2" @click="markAllDone">Mark all Done</button>
    <ul>
      <li v-for="(todo, index) in titleTasks" :key="todo.id">
        <div>
          <input type="checkbox" @click="toggleDone(todo)" />
          <h3 :class="{done : todo.done}">{{todo.content}}</h3>
          <button class="delete" @click="removeTask(index)">🚮</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const newTask = ref('');
    const titleTasks = ref([]);
    function saveNewTask() {
      titleTasks.value.push({
        id: Date.now(),
        done: false,
        content: newTask.value,
      });
      newTask.value = ''; // to clearing input after submit form
    }

    // to done the task
    function toggleDone(todo) {
      todo.done = !todo.done;
    }

    function removeTask(index) {
      titleTasks.value.splice(index, 1)
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

    return {
      saveNewTask,
      newTask,
      titleTasks,
      toggleDone,
      removeTask,
      markAllDone,
      removeAllTasks
    }
  }
}
</script>

<!--24.20-->

<!-- style css-->
<style>
.delete {
  background-color: brown;
  padding: 5px;
  border-radius: 10px;
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
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 70%;
}

.task-detail div {
  margin-top: 3rem;
}

textarea {
  margin-top: 2rem;
  height: 10rem;
  resize: none;
  padding: 10px 5px;
}

input {
  padding: 10px 5px;
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