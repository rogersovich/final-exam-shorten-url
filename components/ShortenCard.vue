<template>
  <div class="p-6 bg-slate-950/75 border border-slate-800 rounded-lg w-full flex items-center justify-between">
    <div>
      <div class="text-primary-500 font-bold text-2xl mb-0.5">
        /dkk30
      </div>
      <div class="text-secondary">
        https://ui.nuxtlabs.com/forms/input
      </div>
    </div>
    <div class="flex items-center justify-end gap-6">
      <div class="">
        <div class="text-secondary flex items-center justify-end gap-4">
          <div class="text-lg font-bold">
            0
          </div>
          <IconChart class="h-7 w-7" />
        </div>
        <div class="text-secondary mt-0.5">
          2023-08-20
        </div>
      </div>
      <div>
        <UButton variant="outline" color="gray" class="py-3.5 px-4 rounded-xl">
          <IconCopy class="w-6 h-6" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
