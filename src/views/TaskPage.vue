
<template>
    <h1>task page</h1>
    <router-link to="/">Home</router-link>
    <TaskForm/>
</template>

<script>
import TaskForm from '@/components/TaskForm.vue'

export default {
    components: {
        TaskForm,
    }
}
</script>