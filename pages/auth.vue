<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const supabaseAuth = useSupabaseClient()
const isRegister = ref(false)

const handleLoginGithub = () => {
  supabaseAuth.auth.signInWithOAuth({
    provider: 'github'
  })
}
</script>
<template>
  <div class="min-h-screen fcc">
    <div>
      <div class="card bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 w-[325px] text-center">
        <div class="border border-slate-500 rounded-full p-4 w-fit mx-auto">
          <IconRegister class="w-8 h-8" v-if="isRegister" />
          <IconLock class="w-8 h-8" v-else />
        </div>
        <div class="mt-3">
          <UButton block color="black" variant="solid" @click="handleLoginGithub"> Continue with Github </UButton>
        </div>
        <hr class="border-slate-500 my-4" />
        <div class="text-left">
          <FormAuth :is-register="isRegister" @toggleIsRegister="isRegister = !isRegister" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
