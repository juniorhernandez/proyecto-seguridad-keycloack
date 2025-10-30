<template>

    <main class="main-container">
      <router-view />
    </main>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f6fa;
  overflow-x: hidden;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f6fa;
  line-height: 1.6;
}


@media (max-width: 992px) {
  .main-content {
    padding: 1.5rem;
    max-width: 90%;
  }
}


@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
    max-width: 95%;
  }

  h1, h2 {
    font-size: 1.4rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.8rem;
    width: 100%;
  }

  h1, h2 {
    font-size: 1.2rem;
  }
}
</style>
