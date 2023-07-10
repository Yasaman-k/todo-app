<template>
    <div>
        <button @click="startTimer" class="cursor-pointer">start</button>
        <button @click="stopTimer" class="cursor-pointer">stop</button>
    </div>
    {{ numberTimer }}
</template>
<script setup>
const props = defineProps(['taskId'])

import { onMounted, ref } from 'vue';
const numberTimer = ref()
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const start = ref(false)
onMounted(() => {
    callSetInterval()
})

const id = ref()
const callSetInterval = () => {
    id.value = setInterval(() => { timerProcess() }, 1000)
}

const timerProcess = () => {
    if (start.value) {
        clearInterval(id)

        if (second.value < 60) {
            second.value++
        } else {

            if (minute.value > 60) {
                minute.value = 0
                hour.value++

            }
            else {
                second.value = 0
                minute.value++
            }
        }
        numberTimer.value = `${hour.value}` + ':' + `${minute.value}` + ':' + `${second.value}`
    }
}
const startTimer = () => {
    numberTimer.value = 0
    start.value = true
}

const stopTimer = () => {
    start.value = false
    clearInterval(id)
    postData(`http://localhost:3000/tasks/${props.taskId}`, {
        duration: numberTimer.value
    })
}

const postData = async (url = '', data = {}) => {
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
</script>