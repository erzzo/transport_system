<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>

<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    background-color: var(--silver-color);
  }

  h1 {
    margin-bottom: unset;
    font-size: 1.5rem;
  }
</style>
