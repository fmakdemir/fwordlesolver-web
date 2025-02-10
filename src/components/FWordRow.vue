<script setup lang="ts">
import { computed } from "vue";
import FWordLetter from "../components/FWordLetter.vue";
import { getEmptyArray } from "@/common/arrays";

const { word, size, disabled } = defineProps({
  word: { type: String, required: true },
  size: { type: Number, required: true },
  disabled: { type: Boolean },
});

const [state] = defineModel<number[]>("state");

const filledWord = computed(() => (word + "_".repeat(size)).substring(0, size));

const onChange = (index: number, event: number) => {
  if (disabled) {
    return;
  }
  const newState = state.value ? [...state.value] : getEmptyArray(size);
  newState[index] = event;
  state.value = newState;
};
</script>

<template>
  <div class="word-row">
    <FWordLetter
      v-for="(letter, i) in filledWord"
      :key="i"
      :letter="letter"
      :state="state ? state[i] : 0"
      :disabled="disabled"
      @update:state="onChange(i, $event)"
    />
  </div>
</template>

<style scoped>
.word-row {
  display: flex;
}
.letter-box {
  @apply uppercase;
  font-family: monospace;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #000;
}
</style>
