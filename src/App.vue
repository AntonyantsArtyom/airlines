<script setup>
import TicketsSettingsForm from "./components/TicketsSettingsForm.vue"
import SortingsForm from "./components/SortingsForm.vue"
import Ticket from "./components/Ticket.vue"
import { useStore } from "../store"
import { computed, ref } from "vue"
import sortTicketsByPrice from "./utils/sortTicketsByPrice"
import sortTicketsByTime from "./utils/sortTicketsByTime"
import FiltersForm from "./components/FiltersForm.vue"
const store = useStore()
const sorting = ref(null)
const filter = ref(999)
const tickets = computed(() => store.tickets_light(sorting.value, filter.value))
</script>

<template>
   <div class="full">
      <div class="settings">
         <TicketsSettingsForm @finish="(options) => store.getTickets(options)" />
         <SortingsForm @price="sorting = sortTicketsByPrice" @time="sorting = sortTicketsByTime" />
         <FiltersForm @inputMax="(maxCount) => (filter = maxCount)" />
      </div>
      <div class="tickets">
         <Ticket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
      </div>
   </div>
</template>

<style scoped>
.full {
   display: grid;
   grid-template-columns: max-content 1fr;
}
.settings {
   margin-top: 5px;
   width: 200px;
   height: 100vh;
}
.tickets {
   display: flex;
   justify-content: center;
   align-content: start;
   flex-wrap: wrap;
   max-height: 100vh;
   overflow-y: scroll;
}
</style>
