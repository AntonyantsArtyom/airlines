<script setup>
import { onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useStore } from "../store"
const store = useStore()
const { tickets } = storeToRefs(store)
onMounted(() => store.getTickets())
</script>

<template>{{ tickets }}</template>

<style scoped></style>
