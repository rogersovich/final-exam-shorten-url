<script setup lang="ts">
import { z } from "zod";

const schema = z.object({
  long_url: z.string(),
  key: z.string().min(4, "Must be at least 4 characters"),
});

const state = ref({
  long_url: undefined,
  key: '/de88j',
});

const form = ref();

async function submit() {
  await form.value!.validate();
  // Do something with data
  console.log(state.value);
}
</script>
<template>
  <div class="p-6 bg-slate-950/75 border border-slate-800 rounded-lg mb-8">
    <UForm ref="form" :schema="schema" :state="state" @submit.prevent="submit">

      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-6">
          <UFormGroup name="long_url">
            <UInput v-model="state.long_url" placeholder="Enter or Paste Long URL" variant="outline" size="lg"  />
          </UFormGroup>
        </div>
        <div class="col-span-3">
          <UFormGroup name="key">
            <UInput v-model="state.key" placeholder="Key" variant="outline" color="white" size="lg" />
          </UFormGroup>
        </div>
        <div class="col-span-3">
          <UButton block size="lg" type="submit" variant="soft">
            <span class="text-[16px]">
              Shorten
            </span>
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>


<style scoped></style>
