<template>
  <div
    class="mb-16 flex flex-col items-center overflow-x-auto rounded border border-gray-400 px-2 py-1"
  >
    <div class="flex w-full md:items-center md:justify-center" v-for="(row, i) in rows" :key="i">
      <PButton
        v-for="key in row"
        :key="key"
        @click="emit('key-press', key)"
        type="button"
        :label="key"
        variant="outlined"
        severity="secondary"
        class="m-1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PButton from "primevue/button";
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
