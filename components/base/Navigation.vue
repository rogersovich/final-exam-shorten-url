<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const toast = useToast();

const handleLogout = async () => {
  let { error } = await supabase.auth.signOut();

  if (error) {
    return toast.add({
      title: "You got error",
      timeout: 3000,
      color: "red",
    });
  }
  
 toast.add({
    title: "Success Logout",
    timeout: 3000,
    color: "green",
  });

  return navigateTo('/')
};
</script>
<template>
  <div class="nav-app">
    <NuxtLink to="/">
      <div class="font-bold text-xl">SHORT</div>
    </NuxtLink>
    <div>
      <UButton
        v-if="!user"
        class="px-6"
        color="primary"
        size="md"
        :ui="{ rounded: 'rounded-full' }"
        to="/auth"
      >
        Log in
      </UButton>
      <UButton
        v-else
        class="px-6"
        color="red"
        size="md"
        :ui="{ rounded: 'rounded-full' }"
        @click="handleLogout"
      >
        Log out
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
