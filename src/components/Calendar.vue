<template>
    <!-- {{ taskStore }} -->
    <!-- {{ arr }}
    {{ taskStore.titleTasks }} -->
{{ jsonvalue}}
    <div class="grid grid-cols-7 gap-4">
        <!-- <p>{{ tasks }} </p>
        <p>{{ JSON.parse(tasks) }} </p> -->
        <!-- <div v-for="(day, index) in arr" :key="index">

            {{ day[0] }} {{ index + 1 }}
        </div> -->
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
console.log(tasks,"tasks");
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
const arr = ref([])
const firstDay = newDate(1402, 3, 1).toString().slice(0, 3)

let startDateIndex = monthWord.findIndex((obj) => {
    return Object.keys(obj)[0] === firstDay
})


onMounted(() => {
  
})
// taskStore.titleTasks[0].filter(x=>x.mainCategory==='daily')
const makeTasks = () => {
    for (let index = 0; index < 31; index++) {
        const dayFarsi = Object.values(monthWord[startDateIndex])
        // arr.value.push(dayFarsi)
        arr.value.push( getTasks[0].mainCategory )
        startDateIndex++
        if (startDateIndex === monthWord.length) startDateIndex = 0
    }
}

</script>