<template>
  <div class="keyboard">
    <div class="keyboard-row" v-for="(row, i) in rows" :key="i">
      <button v-for="key in row" :key="key" @click="emit('key-press', key)" class="key">
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["key-press"]);
const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.keyboard-row {
  display: flex;
  margin-bottom: 10px;
}

.key {
  margin: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  user-select: none;
}

.key:active {
  background-color: #d0d0d0;
}
</style>
