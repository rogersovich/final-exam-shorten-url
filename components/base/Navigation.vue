<template>
  <div class="nav-app">
    <NuxtLink to="/">
      <div class="font-bold text-xl">SHORT</div>
    </NuxtLink>
    <div>
      <UButton
        class="px-6"
        color="primary"
        size="md"
        :ui="{ rounded: 'rounded-full' }"
      >
        Log in
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
