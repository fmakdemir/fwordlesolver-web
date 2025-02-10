<template>
  <div
    class="mb-16 flex w-full max-w-screen flex-col items-center overflow-x-auto rounded border border-gray-400 px-2 py-1"
  >
    <div class="flex w-full md:items-center md:justify-center" v-for="(row, i) in rows" :key="i">
      <button
        v-for="key in row"
        :key="key"
        @click="emit('key-press', key)"
        :class="{ 'bg-gray-300': usedLetters.includes(key.toLowerCase()), 'btn-kb': true }"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { usedLetters } = defineProps<{ usedLetters: string[] }>();

const emit = defineEmits(["key-press"]);

const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];
</script>

<style scoped>
.used-letter {
  background: gray;
}
</style>
