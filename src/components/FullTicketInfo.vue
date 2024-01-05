<script setup>
import { defineEmits } from "vue"
const emit = defineEmits(["clickshadow"])
const { ticket } = defineProps(["ticket"])
console.log(ticket)
</script>

<template>
   <div class="ticket">
      <p class="price">{{ ticket.price }} {{ ticket.currency }}</p>
      <p class="time-description">вылет</p>
      <p class="time">{{ ticket.start }}</p>
      <p class="time-description">приземление</p>
      <p class="time">{{ ticket.end }}</p>
      <p class="time_step">в пути {{ ticket.duration }}</p>
      <p class="company">компания {{ ticket.company }}</p>
      <p class="transplants">пересадок {{ ticket.transplants }}</p>
      <p class="seats">мест осталось {{ ticket.seats }}</p>
      <p class="fare">тариф обслуживания {{ ticket.fare }}</p>
      <p class="source">билет взят из {{ ticket.source }}</p>
      <p class="steps_description">этапы пути</p>
      <p class="step" v-for="step in ticket.steps">{{ step }}</p>
   </div>
   <div class="shadow" @click="$emit('clickshadow')"></div>
</template>

<style scoped>
.shadow {
   z-index: 2;
   position: fixed;
   top: 0px;
   bottom: 0px;
   left: 0px;
   right: 0px;
   background: black;
   opacity: 0.25;
}
.steps_description {
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 25px;
}
.step {
   white-space: pre-wrap;
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 5px;
   margin-bottom: 15px;
}
.source {
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 5px;
}
.fare {
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 5px;
}
.seats {
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 25px;
}

.transplants {
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 5px;
}
.company {
   margin: 0px;
   position: relative;
   left: 2px;
   margin-top: 25px;
}
.time_step {
   margin: 0px;
   margin-top: 5px;
   position: relative;
   left: 2px;
}
.time-description {
   margin: 5px;
   position: relative;
   left: -5px;
}
.time {
   font-size: 18px;
   margin: 0px;
   padding-left: 7px;
   position: relative;
   left: -5px;
}
.price {
   margin: 0px;
   margin-top: 20px;
   margin-bottom: 25px;
   padding: 0px;
   font-size: 36px;
   line-height: 24px;
   font-weight: 600;
}
.ticket {
   cursor: pointer;
   padding-left: 5px;
   width: 300px;
   min-height: 302px;
   flex-shrink: 0;
   border: 1px solid black;
   background-color: white;

   position: fixed;
   z-index: 3;
   left: 50%;
   top: 50px;
   transform: translate(-50%, 0%);

   padding-bottom: 15px;
}
</style>
