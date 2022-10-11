<template>
  <div class="container">
    <form @submit.prevent="saveNewTask">
      <header>
        <h2 class="title2">Create Task</h2>
        <button class="title2">Done</button>
      </header>

      <div class="task-detail">
        <input placeholder="Add Title ... " type="text" name="newTitle" />
        <textarea placeholder="Add Note ... " />
      </div>
    </form>
  </div>
</template>

<script>

export default {
  // name: 'App',
  setup() {
    function saveNewTask() {
      console.log("form ins submitted");
    }
    return {
      saveNewTask
    }
  }
}
</script>



<!-- style css-->
<style>
.container {
  margin: 4rem 1rem;
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

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>