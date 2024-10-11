<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'

  function logout() {
    alert('This was just a fake logout');
  }
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
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
