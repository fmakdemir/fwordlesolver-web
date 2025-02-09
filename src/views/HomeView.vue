<script setup lang="ts">
import FWordRow from "../components/FWordRow.vue"

const colors = ["green", "yellow", "gray", "green", "yellow"];
</script>

<template>
  <main>
    <FWordRow word="Hello" colors={colors} />
  </main>
</template>
