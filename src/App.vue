<template>
  <HeaderUI />
  <div class="main__wrapper">
    <div class="container">
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script setup>
import HeaderUI from './components/UI/HeaderUI.vue'
</script>

