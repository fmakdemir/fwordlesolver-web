<template>
  <div>
    <label for="numberSelect">Word Size: </label>
    <select id="numberSelect" v-model="size">
      <option v-for="number in numbers" :key="number" :value="number">
        {{ number }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const numbers = [3, 4, 5, 6, 7, 8, 9, 10];
const size = defineModel({ type: Number, default: 5 });
</script>

<style scoped>
div,
select {
  font-size: 1.5rem;
}
</style>
