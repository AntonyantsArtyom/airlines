<script setup>
import TicketsSettingsForm from "./components/TicketsSettingsForm.vue"
import Ticket from "./components/Ticket.vue"
import { storeToRefs } from "pinia"
import { useStore } from "../store"
const store = useStore()
const { tickets_light } = storeToRefs(store)
</script>

<template>
   <TicketsSettingsForm @finish="(options) => store.getTickets(options)" />
   <div class="tickets">
      <Ticket v-for="ticket in tickets_light" :key="ticket.id" :ticket="ticket" />
   </div>
</template>

<style scoped>
.tickets {
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
}
</style>
