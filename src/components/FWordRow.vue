<script setup lang="ts">
import FWordLetter from "../components/FWordLetter.vue";

const word = "hello";
</script>

<template>
  <div class="word-row">
    <FWordLetter v-for="(letter, index) in word" :key="index" :letter="letter" />
  </div>
</template>

<style scoped>
.word-row {
  display: flex;
}

.letter-box {
  text-transform: uppercase;
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
