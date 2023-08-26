<script setup lang="ts">
useHead({
  title: 'Short - Home',
  meta: [
    { name: 'description', content: 'Elegant Short URLs for a Sharper Web' },
    { name: 'description', content: 'Transform your long, cumbersome URLs into short and shareable links with TinyLink' }
  ],
})
</script>
<template>
  <div class="min-h-screen fcc px-4 sm:px-0">
    <div class="text-center">
      <div class="rainbow-text text-hero">
        Elegant Short URLs  <br />
        for a Sharper Web
      </div>
      <div class="text-secondary sm:text-lg mt-8 mb-6">
        Transform your long, cumbersome URLs into short and <br />
        shareable links with TinyLink
      </div>
      <UButton class="px-6" color="gray" size="md" to="/dashboard">
        Short Now
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
