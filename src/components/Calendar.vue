<template>
    <div class="grid grid-cols-7 gap-4">
        <!-- {{ arr }}kk -->
        <div v-for="(date,index) in arr">
        <div>{{ date }} {{ index+1 }}</div>
        </div>
        <!-- {{  tasks.filter(x => x.mainCategory === 'daily') }} -->
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

// const jsonvalue = JSON.parse(tasks.value)

onMounted(() => {
    taskStore.fetchTasks();
    makeTasks()
    addDailyTasksToDays()
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

const arr = ref([])
// taskStore.titleTasks[0].filter(x=>x.mainCategory==='daily')
const makeTasks = () => {
    for (let index = 0; index < 31; index++) {
        const dayFarsi = Object.values(monthWord[startDateIndex])
        arr.value.push({date:dayFarsi})
        // console.log(tasks.value.filter(x => x.mainCategory === 'daily'));
        // const filter = tasks
        // arr.value.push(filter)
        startDateIndex++
        if (startDateIndex === monthWord.length) startDateIndex = 0
    }
}

const addDailyTasksToDays = () => {
    for (let index = 0; index < arr.value.length; index++) {
        // console.log(tasks.value.filter(x => x.mainCategory === 'daily'));
        // console.log(;
        console.log(arr.value[index]);
        // const filter = tasks
        // arr[index].value = filter
        
    }
}

</script>