<script setup lang="ts">
const props = defineProps<{
  link: {
    long_url: string;
    key: string;
    id: number;
  };
}>();

const link = toRef(props, "link");
const toast = useToast();
const config = useRuntimeConfig();

// Handle Func Copy
const { copy, isSupported } = useClipboard({
  source: link.value.key,
});
const isCopied = ref(false);
const onCopyLink = () => {
  if (!isSupported) {
    toast.add({
      title: "Sorry the Browser not Supported",
      timeout: 2000,
      color: "red",
    });
  }
  copy(config.public.appUrl + link.value.key);
  isCopied.value = true;
  toast.add({
    title: "Copied to Clipboard!",
    timeout: 2000,
    color: "green",
  });
};

watch(isCopied, (newCopied) => {
  if (newCopied) {
    setTimeout(() => {
      isCopied.value = false;
    }, 1500);
  }
});
</script>
<template>
  <div
    class="p-6 bg-slate-950/75 border border-slate-800 hover:border-slate-600 rounded-lg w-full flex items-center justify-between"
  >
    <div>
      <div class="text-primary-500 font-bold text-2xl mb-0.5">
        {{ link.key }}
      </div>
      <div class="text-secondary">
        {{ link.long_url.slice(0, 20) + "..." }}
      </div>
    </div>
    <div class="flex items-center justify-end gap-6">
      <div class="">
        <div class="text-secondary flex items-center justify-end gap-4">
          <div class="text-lg font-bold">0</div>
          <IconChart class="h-7 w-7" />
        </div>
        <div class="text-secondary mt-0.5">2023-08-20</div>
      </div>
      <div>
        <UButton
          @click="onCopyLink"
          variant="outline"
          color="gray"
          :class="
            cn(
              'py-3.5 px-4 rounded-xl hover:bg-slate-900',
              isCopied && '!ring-primary-500'
            )
          "
        >
          <IconCopy class="w-6 h-6" v-if="!isCopied" />
          <IconCheck class="w-6 h-6 text-primary-500" v-else />
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
