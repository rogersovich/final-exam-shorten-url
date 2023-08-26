<script setup lang="ts">
const props = defineProps<{
  link: linksResponse
}>()

const link = toRef(props, "link")
const config = useRuntimeConfig()

// Handle Func Copy
const isCopied = ref(false)

const formattedDate = useDateFormat(link.value.created_at, 'YYYY-MM-DD - HH:mm')

watch(isCopied, (newCopied) => {
  if (newCopied) {
    setTimeout(() => {
      isCopied.value = false
    }, 1500)
  }
})
</script>
<template>
  <div class="shorten-card flex items-center justify-between">
    <div>
      <NuxtLink :to="`/dashboard/${link.key}`">
        <div class="text-primary-500 font-bold text-2xl mb-0.5">
          {{ link.key }}
        </div>
      </NuxtLink>
      <div class="text-secondary">
        {{ link.long_url.slice(0, 20) + "..." }}
      </div>
    </div>
    <div class="flex items-center justify-end gap-6">
      <div class="">
        <div class="text-secondary flex items-center justify-end gap-4">
          <div class="text-lg font-bold">
            {{ link.total_clicks }}
          </div>
          <IconChart class="h-7 w-7" />
        </div>
        <div class="text-secondary mt-0.5">
          {{ formattedDate }}
        </div>
      </div>
      <div>
        <BaseButtonCopy
          :source="config.public.appUrl + '/' + link.key"
          :is-copied="isCopied"
          @update-is-copied="isCopied = true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
