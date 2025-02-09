<script setup lang="ts">
import { computed, defineProps, ref } from "vue";

const { letter } = defineProps(["letter"]);
const colorIndex = ref(0);
const colors = ["gray", "yellow", "blue"];
const colorClass = computed(() => letter ?? `${colors[colorIndex.value]}-box`);
</script>

<template>
  <div :class="['letter-box', colorClass]" @click="colorIndex = (colorIndex + 1) % 3">
    {{ letter || "_" }}
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
