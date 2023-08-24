<script setup lang="ts">
import { z } from "zod";

const { isRegister } = defineProps<{
  isRegister: boolean
}>()

const emits = defineEmits(['toggleIsRegister'])

const supabaseAuth = useSupabaseClient()
const toast = useToast();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = ref<{
  email: undefined | string
  password: undefined | string
}>({
  email: undefined,
  password: undefined,
});

const form = ref();
const isLoading = ref(false)


const onLogin = async () => {
  try {
    isLoading.value = true
    const { error } = await supabaseAuth.auth.signInWithPassword({
      email: state.value.email as string,
      password: state.value.password as string
    })

    if (error) {
      throw error
    }

    isLoading.value = false


    toast.add({
      title: "Success Login Account!",
      timeout: 3000,
      color: "green",
    });


    return navigateTo('/dashboard')
  } catch (error: any) {
    isLoading.value = false
    toast.add({
      title: error.message,
      timeout: 3000,
      color: "red",
    });

  }
}

const onRegister = async () => {
  try {
    isLoading.value = true
    const { error } = await supabaseAuth.auth.signUp({
      email: state.value.email as string,
      password: state.value.password as string
    })

    if (error) {
      throw error
    }

    isLoading.value = false

    toast.add({
      title: "Success Registered Account!",
      timeout: 3000,
      color: "green",
    });

    return navigateTo('/dashboard')
  } catch (error: any) {
    isLoading.value = false
    toast.add({
      title: error.message,
      timeout: 3000,
      color: "red",
    });

  }
}


async function submit() {
  await form.value!.validate();
  if (isRegister) {
    await onRegister()
  } else {
    await onLogin()
  }
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" @submit.prevent="submit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" placeholder="Email" variant="outline" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" variant="outline" placeholder="Password" />
    </UFormGroup>

    <UButton :loading="isLoading" type="submit" size="md" block class="!bg-primary-700 !text-white !text-base">
      {{ isRegister ? 'Sign Up' : 'Sign In' }}
    </UButton>

    <div class="mt-3 text-sm text-center text-secondary">

      {{ isRegister ? 'Already have Account' : ' Dont have Account ?' }}
      <span class="underline cursor-pointer" @click.native="emits('toggleIsRegister')">
        {{ isRegister ? 'Sign In' : 'Sign Up' }}
      </span>
    </div>
  </UForm>
</template>
