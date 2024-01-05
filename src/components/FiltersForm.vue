<script setup></script>

<template>
   <div class="filters">
      <div>
         <input type="radio" name="transplants" value="0" @input.prevent="$emit('inputMax', 0)" />
         <label>без пересадок</label>
      </div>
      <div>
         <input type="radio" name="transplants" value="1" @input.prevent="$emit('inputMax', 1)" />
         <label>максимум 1</label>
      </div>
      <div>
         <input type="radio" name="transplants" value="2" @input.prevent="$emit('inputMax', 2)" />
         <label>максимум 2</label>
      </div>
      <div>
         <input type="radio" name="transplants" value="999" @input.prevent="$emit('inputMax', 999)" />
         <label>любое количество</label>
      </div>
   </div>
</template>

<style scoped>
.filters {
   width: 200px;
   border: 1px solid black;
}
</style>
