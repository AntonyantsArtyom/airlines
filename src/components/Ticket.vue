<script setup>
const { ticket } = defineProps(["ticket"])
</script>

<template>
   <div class="ticket">
      <p>{{ ticket.price }} {{ ticket.currency }}</p>
      <p>вылет {{ ticket.start }}</p>
      <p>приземление {{ ticket.end }}</p>
      <p>длительность {{ ticket.duration }}</p>
      <p>компания {{ ticket.company }}</p>
      <p>кол-во пересадок {{ ticket.transplants }}</p>
   </div>
</template>

<style scoped>
.ticket {
   width: 400px;
   flex-shrink: 0;
   border: 1px solid black;
   margin: 5px;
}
</style>
