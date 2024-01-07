<script setup>
import TicketsSettingsForm from "./components/TicketsSettingsForm.vue"
import SortingsForm from "./components/SortingsForm.vue"
import Ticket from "./components/Ticket.vue"
import { useStore } from "../store"
import { computed, ref } from "vue"
import sortTicketsByPrice from "./utils/sortTicketsByPrice"
import sortTicketsByTime from "./utils/sortTicketsByTime"
import FiltersForm from "./components/FiltersForm.vue"
import FullTicketInfo from "./components/FullTicketInfo.vue"
const showHover = ref(false)
const showMenu = ref(false)

const store = useStore()
const sorting = ref(null)
const filter = ref(999)
const tickets = computed(() => store.tickets_light(sorting.value, filter.value))
const ticketForShowId = ref(null)
const ticketForShow = computed(() => store.getTicketInfo(ticketForShowId.value))

const width = ref(window.innerWidth)
window.addEventListener("resize", () => (width.value = window.innerWidth))
</script>

<template>
   <!--ховер подробной информации-->
   <FullTicketInfo :ticket="ticketForShow" @clickshadow="showHover = false" v-if="showHover" />

   <!--ховер меню и тени меню - работает для малых экранов-->
   <div @click="showMenu = false" v-if="showMenu" class="shadow"></div>
   <button class="menu_open_button" @click="showMenu = true" v-if="width < 560">открыть меню</button>
   <div class="settings_hover" v-if="showMenu">
      <TicketsSettingsForm @finish="(options) => store.getTickets(options)" />
      <SortingsForm @price="sorting = sortTicketsByPrice" @time="sorting = sortTicketsByTime" />
      <FiltersForm @inputMax="(maxCount) => (filter = maxCount)" />
   </div>

   <div class="full">
      <!--блок меню настроект для широких экранов-->
      <div class="settings" v-if="width >= 560">
         <TicketsSettingsForm @finish="(options) => store.getTickets(options)" />
         <SortingsForm @price="sorting = sortTicketsByPrice" @time="sorting = sortTicketsByTime" />
         <FiltersForm @inputMax="(maxCount) => (filter = maxCount)" />
      </div>
      <!--список билетов-->
      <div class="tickets">
         <Ticket
            @ticketclick="
               (ticket) => {
                  ticketForShowId = ticket.id
                  showHover = !showHover
               }
            "
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
         />
      </div>
   </div>
</template>

<style scoped>
.shadow {
   z-index: 4;
   position: fixed;
   top: 0px;
   bottom: 0px;
   left: 0px;
   right: 0px;
   background: black;
   opacity: 0.25;
}
.settings_hover {
   position: fixed;
   left: 50%;
   transform: translate(-50%, 0px);
   z-index: 5;
}
.menu_open_button {
   z-index: 3;
   margin: 0px;
   padding: 0px;
   height: 45px;
   width: 200px;
   position: absolute;
   left: calc(50% - 5px);
   bottom: 25px;
   transform: translate(-50%, 0);
}
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

@media (max-width: 560px) {
   .full {
      display: grid;
      grid-template-columns: 1fr !important;
   }
}
</style>
