<script setup>
import TicketsSettingsForm from "./components/TicketsSettingsForm.vue"
import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useStore } from "../store"
const store = useStore()
const { tickets } = storeToRefs(store)
</script>

<template>
   <TicketsSettingsForm @finish="(result) => console.log(result)" />
   <div v-if="tickets.length > 0">{{ tickets }}</div>
</template>

<style scoped></style>
