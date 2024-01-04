<script setup>
import { reactive } from "vue"
const options = reactive({ out_city: null, in_city: null, date: null })
</script>

<template>
   <form class="ticketsSettingsForm" @submit.prevent="$emit('finish', options)">
      <p>город отправки (iata-код)</p>
      <input name="out" v-model="options.out_city" />
      <p>город прибытия (iata-код)</p>
      <input name="in" v-model="options.in_city" />
      <p>дата отправки</p>
      <input type="date" name="date" v-model="options.date" />
      <button>найти билеты</button>
   </form>
</template>

<style scoped>
.ticketsSettingsForm {
   border: 1px solid black;
   padding: 5px;
   margin: auto;
   display: grid;
   width: 200px;
}
input[name="date"] {
   width: 100px;
}
</style>
