<template>
  <h1>
    Wordle Solver<PButton
      variant="text"
      severity="secondary"
      rounded
      :icon="darkMode ? 'pi pi-moon' : 'pi pi-sun'"
      @click="toggleDarkMode()"
    />
  </h1>

  <RouterView />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { DARK_MODE_CLASS } from "./common/constants";

const darkMode = ref(false);

const toggleDarkMode = () => {
  document.documentElement.classList.toggle(DARK_MODE_CLASS);
  darkMode.value = document.documentElement.classList.contains(DARK_MODE_CLASS);
};
</script>

<style scoped>
h1 {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  line-height: 1.5;
  max-height: 100vh;
  font-size: 3rem;
  margin-bottom: 2rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
