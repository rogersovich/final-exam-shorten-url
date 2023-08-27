<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()
const colorMode = useColorMode()

const handleLogout = async () => {
  let { error } = await supabase.auth.signOut()

  if (error) {
    return toast.add({
      title: "You got error",
      timeout: 3000,
      color: "red",
    })
  }

  toast.add({
    title: "Success Logout",
    timeout: 3000,
    color: "green",
  })

  return navigateTo("/")
}
</script>
<template>
  <div class="nav-app">
    <NuxtLink to="/">
      <div class="font-bold text-xl tracking-[4px]">SHORT</div>
    </NuxtLink>
    <div>
      <ClientOnly>
        <UButton
          v-if="!user"
          class="px-6"
          color="primary"
         :variant="cn(colorMode.value == 'dark' ? 'soft' : 'solid')"
          size="md"
          :ui="{ rounded: 'rounded-md' }"
          to="/auth"
        >
          Sign In
        </UButton>

        <UButton
          v-else
          :variant="cn(colorMode.value == 'dark' ? 'soft' : 'solid')"
          color="red"
          size="md"
          @click="handleLogout"
        >
          <IconLogout class="w-6 h-6" />
        </UButton>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
