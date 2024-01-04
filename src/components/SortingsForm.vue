<script setup>
import { ref, defineEmits } from "vue"
const emit = defineEmits(["price", "time"])
const type = ref(null)
</script>

<template>
   <div class="sortings">
      <button @click="type = $emit('price') || 'price'" :class="{ active: type == 'price' }">сначала дешевые</button>
      <button @click="type = $emit('time') || 'time'" :class="{ active: type == 'time' }">сначала быстрые</button>
   </div>
</template>

<style scoped>
.sortings {
   padding: 5px 0px;
   display: grid;
   width: 200px;
}
.sortings > button {
   height: 45px;
}
.active {
   background: #80a6ff;
}
</style>
