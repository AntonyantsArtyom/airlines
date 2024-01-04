<script setup>
import { ref, watch } from "vue"
import { useStore } from "../../store"
const store = useStore()
const type = ref(null)
watch(type, () => store.sortTickets(type.value))
</script>

<template>
   <button :class="{ active: type == 'price' }" @click="type = 'price'">сначала дешевые</button>
   <button :class="{ active: type == 'time' }" @click="type = 'time'">сначала быстрые</button>
</template>

<style scoped>
.active {
   background: #80a6ff;
}
</style>
