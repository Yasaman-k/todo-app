<template>
    <div class="grid grid-cols-7 gap-4">
        <!-- {{ arr }}kk -->
        <div v-for="(date, index) in makeTasks">
            {{ date[0] }}
            {{ index+1 }}
           <div v-for="(dailyTask, index) in date[1]"> {{ dailyTask.content  }}</div>
        </div>
    </div>
</template>
<script setup>
import { newDate } from 'date-fns-jalali'
import { onMounted, computed, ref } from 'vue';
const props = defineProps(['tasks'])

import { useTasksStore } from '@/stores/tasks'
const taskStore = useTasksStore()

// const getTasks = computed(() => {
//   return taskStore.getTasks;
// });
const tasks = computed(() => {
    return taskStore.tasks;
});

const filteredTasks = computed(() => {
    return taskStore.tasks.filter(x =>  x.mainCategory === 'daily')
})

onMounted(() => {
    taskStore.fetchTasks();
    // makeTasks()
   
});

const monthWord = [
    { 'Sat': 'شنبه' },
    { 'Sun': 'یکشنبه' },
    { 'Mon': 'دوشنبه' },
    { 'Tue': 'سه شنبه' },
    { 'Wed': 'چهارشنبه' },
    { 'Thu': 'پنجشنبه' },
    { 'Fri': 'جمعه' }
]

const firstDay = newDate(1402, 3, 1).toString().slice(0, 3)

let startDateIndex = monthWord.findIndex((obj) => {
    return Object.keys(obj)[0] === firstDay
})


const xref =ref(taskStore.tasks.filter(x =>  x.mainCategory === 'daily'))

// taskStore.titleTasks[0].filter(x=>x.mainCategory==='daily')
const makeTasks =computed( () => {
    const arr = []
    for (let index = 0; index < 31; index++) {
        const dayFarsi = Object.values(monthWord[startDateIndex])
        arr.push(dayFarsi)
        startDateIndex++
        if (startDateIndex === monthWord.length) startDateIndex = 0
    }
    for (let index = 0; index < 31; index++) {
        arr[index].push(taskStore.tasks.filter(x =>  x.mainCategory === 'daily'))
    }
    return arr
})


</script>