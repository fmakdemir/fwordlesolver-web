
<script setup lang="ts">
const { word } = defineProps(['word']);
function    getColorClass(index: number) {
      const color = this.colors[index];
      if (color === 'green') return 'green-box';
      if (color === 'yellow') return 'yellow-box';
      if (color === 'gray') return 'gray-box';
      return '';
    }
</script>

<template>
  <div class="word-row">
    <div
      v-for="(letter, index) in word"
      :key="index"
      :class="['letter-box', getColorClass(index)]"
    >
      {{ letter }}
    </div>
  </div>
</template>

<style scoped>
.word-row {
  display: flex;
}

.letter-box {
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

.green-box {
  background-color: green;
  color: white;
}

.yellow-box {
  background-color: yellow;
  color: black;
}

.gray-box {
  background-color: gray;
  color: white;
}
</style>
