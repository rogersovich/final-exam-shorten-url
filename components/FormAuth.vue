<script setup lang="ts">
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = ref({
  email: undefined,
  password: undefined,
});

const form = ref();

async function submit() {
  await form.value!.validate();
  // Do something with data
  console.log(state.value);
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" @submit.prevent="submit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" placeholder="Email" color="black" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="state.password"
        type="password"
        color="black"
        placeholder="Password"
      />
    </UFormGroup>

    <UButton type="submit" block color="black"> Submit </UButton>
  </UForm>
</template>
