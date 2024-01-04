<script setup>
import TicketsSettingsForm from "./components/TicketsSettingsForm.vue"
import SortingsForm from "./components/SortingsForm.vue"
import Ticket from "./components/Ticket.vue"
import { useStore } from "../store"
import { computed } from "vue"

const store = useStore()
const tickets = computed(() => store.tickets_light)
</script>

<template>
   <TicketsSettingsForm @finish="(options) => store.getTickets(options)" />
   <SortingsForm />
   <div class="tickets">
      <Ticket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
   </div>
</template>

<style scoped>
.tickets {
   display: flex;
   justify-content: right;
   flex-wrap: wrap;

   max-height: 470px;
   overflow-y: scroll;
}
</style>
