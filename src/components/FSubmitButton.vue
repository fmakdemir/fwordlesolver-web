<template>
  <button
    :class="ready ? 'btn-sugg' : 'btn'"
    :disabled="!ready"
    @click="ready ? emit('click') : null"
  >
    Submit ➕
  </button>
</template>

<script setup lang="ts">
defineProps<{ ready: boolean }>();
const emit = defineEmits<{ click: [] }>();
</script>

<style scoped></style>
