<script setup>
const { ticket } = defineProps(["ticket"])
</script>

<template>
   <div class="ticket" @click="$emit('ticketclick', ticket)">
      <p class="price">{{ ticket.price }} {{ ticket.currency }}</p>
      <p class="time-description">вылет</p>
      <p class="time">{{ ticket.start }}</p>
      <p class="time-description">приземление</p>
      <p class="time">{{ ticket.end }}</p>
      <p class="time_step">в пути {{ ticket.duration }}</p>
      <p class="company">компания {{ ticket.company }}</p>
      <p class="transplants">пересадок {{ ticket.transplants }}</p>
   </div>
</template>

<style scoped>
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
   height: 302px;
   flex-shrink: 0;
   border: 1px solid black;
   margin: 5px;
}
@media (max-width: 560px) {
   .ticket {
      width: 250px;
   }
}
</style>
