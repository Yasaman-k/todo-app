<template>
    <!-- month start from 0 -->
    <!-- {{ newDate(1402, 3, 1).toString().slice(0, 3) }}
    {{ format(newDate(1402, 3, 1), 'MMMM') }} -->
    <div  class="grid grid-cols-7 gap-4">
        <div v-for="(day, index) in arr" :key="index">

{{ day[0] }} {{ index+1 }}
</div>
    </div>
   
</template>
<script setup>
import { compareAsc, format, newDate } from 'date-fns-jalali'

import { onMounted, ref } from 'vue';
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

for (let index = 0; index < 31; index++) {
    arr.value.push(Object.values(monthWord[startDateIndex]))
    startDateIndex++
    if (startDateIndex === monthWord.length ) startDateIndex = 0
}
</script>