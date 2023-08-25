<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

//@ts-ignore
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const { data } = useAsyncData<linksResponse[]>("links", async () => {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.value?.id);
  if (error) {
    throw error;
  }

  return data;
});
</script>
<template>
  <div class="min-h-screen pt-20 pb-8 px-[5%] lg:px-[15%]">
    <div class="text-left">
      <p class="text-2xl font-bold my-8">Dashboard</p>
      <ShortenForm />
      <div class="flex flex-col gap-y-6">
        <ShortenCard v-for="(link, i) in data" :key="link.id" :link="link" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
~/schema/supabase