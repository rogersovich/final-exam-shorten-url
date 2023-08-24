<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
<template>
  <div class="min-h-screen pt-20 pb-8  px-[5%] lg:px-[15%]">
    <div class="text-left">
      <p class="text-2xl font-bold my-8">
        Dashboard
      </p>
      <ShortenForm />
      <div class="flex flex-col gap-y-6">
        <ShortenCard />
        <ShortenCard />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
