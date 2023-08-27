<script setup lang="ts">
const props = defineProps<{
  source: string
  isCopied: boolean
}>()

const emits = defineEmits(["updateIsCopied"])

const toast = useToast()
const { copy, isSupported } = useClipboard({
  source: props.source,
})

const onCopyLink = () => {
  if (!isSupported) {
    toast.add({
      title: "Sorry the Browser not Supported",
      timeout: 2000,
      color: "red",
    })
  }
  copy(props.source)
  emits("updateIsCopied")
  toast.add({
    title: "Copied to Clipboard!",
    timeout: 2000,
    color: "green",
  })
}
</script>

<template>
  <UButton
    @click="onCopyLink"
    variant="outline"
    color="gray"
    :class="
      cn(
        'py-3.5 px-4 rounded-xl ring-slate-300 dark:ring-slate-700 hover:bg-slate-300 dark:hover:bg-slate-900',
        isCopied && '!ring-primary-500 !bg-white dark:!bg-black'
      )
    "
  >
    <IconCopy class="w-6 h-6" v-if="!isCopied" />
    <IconCheck class="w-6 h-6 text-primary-500" v-else />
  </UButton>
</template>

<style scoped></style>
