<script setup lang="ts">
import { z } from "zod"

const emits = defineEmits(['refetchLinks'])

//@ts-ignore
const supabase = useSupabaseClient<Database>()
const authSupabase = useSupabaseUser()
const toast = useToast()

const schema = z.object({
  long_url: z.string(),
  key: z.string().min(4, "Must be at least 4 characters"),
})

const state = ref({
  long_url: undefined,
  key: generateRandomShortenString({ minLength: 5 }),
})

const form = ref()

async function submit() {
  await form.value!.validate()

  try {
    const { error } = await supabase.from("links").insert({
      long_url: state.value.long_url,
      key: state.value.key.replace("/", ""),
      user_id: authSupabase.value?.id,
    })

    if (error) {
      throw error
    }

    state.value.key = generateRandomShortenString({ minLength: 5 })
    state.value.long_url = undefined

    emits('refetchLinks')
    toast.add({
      title: "Success Created Shorten Link",
      timeout: 3000,
      color: "green",
    })
  } catch (error: any) {
    toast.add({
      title: error.message,
      timeout: 3000,
      color: "red",
    })
  }
}
</script>
<template>
  <div class="p-6 bg-slate-950/75 border border-slate-800 rounded-lg mb-8">
    <UForm ref="form" :schema="schema" :state="state" @submit.prevent="submit">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-6">
          <UFormGroup name="long_url">
            <UInput
              v-model="state.long_url"
              placeholder="Enter or Paste Long URL"
              variant="outline"
              size="lg"
            />
          </UFormGroup>
        </div>
        <div class="col-span-3">
          <UFormGroup name="key">
            <UInput
              v-model="state.key"
              placeholder="Key"
              variant="outline"
              color="white"
              size="lg"
            />
          </UFormGroup>
        </div>
        <div class="col-span-3">
          <UButton block size="lg" type="submit" variant="soft">
            <span class="text-[16px]"> Shorten </span>
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>

<style scoped></style>
