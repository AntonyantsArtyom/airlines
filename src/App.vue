<script setup>
import TicketsSettingsForm from "./components/TicketsSettingsForm.vue"
import SortingsForm from "./components/SortingsForm.vue"
import Ticket from "./components/Ticket.vue"
import { useStore } from "../store"
import { computed, ref } from "vue"
import sortTicketsByPrice from "./utils/sortTicketsByPrice"
import sortTicketsByTime from "./utils/sortTicketsByTime"
const store = useStore()
const sorting = ref(null)
const filter = ref(null)
const tickets = computed(() => store.tickets_light(sorting.value, filter.value))
</script>

<template>
   <TicketsSettingsForm @finish="(options) => store.getTickets(options)" />
   <SortingsForm @price="sorting = sortTicketsByPrice" @time="sorting = sortTicketsByTime" />
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
