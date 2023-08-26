<script setup lang="ts">
definePageMeta({
  middleware: "auth",
})

//@ts-ignore
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const { data, refresh } = useAsyncData<linksResponse[]>("links", async () => {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.value?.id)
  if (error) {
    throw error
  }
 
  return data
})
</script>
<template>
  <div class="min-h-screen pt-20 pb-8 px-[5%] lg:px-[15%]">
    <div class="text-left">
      <p class="text-2xl font-bold my-8">Dashboard</p>
      <ShortenForm @refetch-links="refresh()" />
      <ClientOnly fallback="Please Wait..." v-if="data">
        <div class="flex flex-col gap-y-6" v-if="data.length > 0">
          <ShortenCard v-for="link in data" :key="link.id" :link="link" />
        </div>
        <div
          v-else
          class="flex items-center justify-center min-h-[300px] shorten-card"
        >
          <div>
            <div class="flex items-center justify-center mb-4">
              <IconEmpty class="w-14 h-14 text-primary-800" />
            </div>
            <div class="text-xl text-slate-400">
              Your Link is Empty, Please Create First
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
~/schema/supabase
