<script setup lang="ts">
import { STATES } from "@/common/constants";
import { computed, watch } from "vue";

const { letter, disabled } = defineProps({
  letter: String,
  disabled: Boolean,
});
const [state] = defineModel<number>("state", { default: 0 });

const colorClass = computed(() => (letter != "_" ? `${STATES[state.value].color}-box` : ""));

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

<template>
  <div :class="['letter-box', colorClass]" @click="onClick">
    {{ letter }}
  </div>
</template>

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
