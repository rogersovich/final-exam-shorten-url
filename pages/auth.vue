<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
useHead({
  title: 'Short - Auth',
  meta: [
    { name: 'description', content: 'Elegant Short URLs for a Sharper Web' },
    { name: 'description', content: 'Transform your long, cumbersome URLs into short and shareable links with TinyLink' }
  ],
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
      <div class="card dark:bg-white/5 bg-slate-950/5 backdrop-blur-lg border dark:border-white/5 border-slate-950/5 rounded-2xl p-5 w-[325px] text-center">
        <div class="border dark:border-slate-400 border-slate-600 dark:text-slate-300 text-slate-700 rounded-full p-4 w-fit mx-auto">
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
