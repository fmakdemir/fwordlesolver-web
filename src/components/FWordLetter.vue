<template>
  <Button
    class="m-1 h-10 w-10 border-1 border-gray-500 text-black uppercase"
    :severity="severity"
    :label="letter"
    :disabled="_disabled"
    @click="onClick()"
  />
</template>

<script setup lang="ts">
import { STATES } from "@/common/constants";
import Button from "primevue/button";
import { computed, watch } from "vue";

const { letter, disabled } = defineProps({
  letter: String,
  disabled: Boolean,
});
const state = defineModel<number>("state", { default: 0 });
const severity = computed(() => STATES[state.value].severity);
const _disabled = computed(() => letter === "_" || disabled);

watch(
  () => letter,
  () => {
    state.value = 0;
  },
);

const onClick = () => {
  if (disabled) {
    return;
  }
  state.value = letter === "_" ? 0 : (state.value + 1) % 3;
};
</script>

<style scoped>
.letter-box {
  width: 40px;
  height: 40px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #000;
}

.green-box {
  background-color: green;
  color: white;
}

.blue-box {
  background-color: rgb(33, 167, 230);
  color: white;
}

.yellow-box {
  background-color: rgb(252, 226, 80);
  color: black;
}

.gray-box {
  background-color: gray;
  color: white;
}
</style>
