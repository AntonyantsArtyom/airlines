<script setup>
import { ref, defineEmits } from "vue"
const emit = defineEmits(["price", "time"])
const type = ref(null)
</script>

<template>
   <button @click="type = $emit('price') || 'price'" :class="{ active: type == 'price' }">сначала дешевые</button>
   <button @click="type = $emit('time') || 'time'" :class="{ active: type == 'time' }">сначала быстрые</button>
</template>

<style scoped>
.active {
   background: #80a6ff;
}
</style>
