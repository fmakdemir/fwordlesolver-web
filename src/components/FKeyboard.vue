<template>
  <div
    class="mb-16 flex max-w-screen flex-col items-center overflow-x-auto rounded border border-gray-400 py-1 md:px-2"
  >
    <div class="flex w-full items-center justify-center pb-1" v-for="(row, i) in rows" :key="i">
      <PButton
        v-for="key in row"
        :key="key"
        @click="emit('key-press', key)"
        :label="key"
        variant="outlined"
        :severity="severityMap[key].severity"
        class="m-0.5 md:m-1 lg:m-2"
        :class="{ '!bg-gray-300': severityMap[key].used }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { usedLetters } = defineProps<{ usedLetters: string[] }>();

const emit = defineEmits(["key-press"]);

const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"],
];

const severityMap = computed(() => {
  const m: Record<string, { severity: string; used: boolean }> = {};
  rows.forEach((r) =>
    r.forEach((key) => {
      let severity = "secondary";
      if (key === "Enter") {
        severity = "primary";
      } else if (key === "Delete") {
        severity = "danger";
      }
      m[key] = { severity, used: usedLetters.includes(key) };
    }),
  );
  return m;
});
</script>

<style scoped>
.used-letter {
  background: gray;
}
</style>
