<script setup lang="ts">
  import { RouterView } from 'vue-router'

  function logout() {
    alert('This was just a fake logout');
  }
</script>

<template>
  <header>
    <b-navbar class="navbar" toggleable="lg">
      <b-navbar-brand to="/" class="brand">Swida transport management system</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-button variant="light" @click="logout">Fake Logout</b-button>
      </b-navbar-nav>
    </b-navbar>
  </header>

  <RouterView />
</template>

<style lang="scss">
  .navbar {
    width: 100%;
    background-color: var(--primary-color);

    .brand {
      color: white !important;
      text-transform: capitalize;
    }
  }
</style>
