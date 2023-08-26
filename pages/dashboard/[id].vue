<script lang="ts" setup>
const { id } = useRoute().params
useHead({
  title: `Short - Dashboard ${id}`,
  meta: [
    { name: "description", content: "Elegant Short URLs for a Sharper Web" },
    {
      name: "description",
      content:
        "Transform your long, cumbersome URLs into short and shareable links with TinyLink",
    },
  ],
})
//@ts-ignore
const clients = useSupabaseClient<Database>()
const config = useRuntimeConfig()

// Handle Func Copy
const isCopied = ref(false)

watch(isCopied, (newCopied) => {
  if (newCopied) {
    setTimeout(() => {
      isCopied.value = false
    }, 1500)
  }
})

const { data, error } = await useAsyncData<linksResponse>(
  `links-${id}`,
  async () => {
    const { data, error } = await clients
      .from("links")
      .select("*, clicks(*)")
      .eq("key", id)
      .single()

    if (error) {
      throw error
    }

    return data
  }
)

if (error.value) {
  throw createError({
    statusCode: 404,
    message: "Link not found",
  })
}

const formattedDate = (date: Date | string | undefined) => {
  const format = useDateFormat(date, "YYYY-MM-DD - HH:mm")
  return format.value
}
</script>

<template>
  <div class="min-h-screen pt-20 pb-8 px-[5%] lg:px-[15%]">
    <ClientOnly fallback="Please Wait...">
      <section class="pt-12 container">
        <div>
          <div>
            <UButton
              variant="soft"
              color="black"
              :padded="false"
              to="/dashboard"
            >
              <IconBack class="w-10 h-10" />
            </UButton>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-primary-500">
                {{ `/${data?.key}` }}
              </h1>
            </div>
            <BaseButtonCopy
              :source="config.public.appUrl + '/' + data?.key"
              :is-copied="isCopied"
              @update-is-copied="isCopied = true"
            />
          </div>
          <div class="mt-2 text-slate-400">
            {{ formattedDate(data?.created_at) }}
          </div>
        </div>

        <div class="stats flex mt-10 flex-wrap md:flex-nowrap">
          <div class="shorten-card">
            <div class="text-4xl font-bold">
              {{ data?.total_clicks ?? 0 }}
            </div>
            <div class="text-slate-400 text-lg">Total Clicks</div>
          </div>
          <div class="shorten-card mt-5 md:mt-0 md:ml-5 w-full relatifcve">
            <div class="md:text-lg text-slate-300">
              {{ data?.long_url }}
            </div>
          </div>
        </div>

        <div class="clicks mt-10">
          <div v-for="click in data?.clicks" class="card w-full mb-5">
            <template v-if="click && typeof click === 'object'">
              <div class="flex justify-between shorten-card">
                <div class="div">
                  <div class="text-primary-500 text-lg">
                    {{ `IP : ${click.ip}` }}
                  </div>
                  <div class="text-slate-300">
                    {{ `Date : ${formattedDate(click.created_at)}` }}
                  </div>
                </div>
                <div class="div text-slate-300">
                  <div v-if="click.country">Country: {{ click.country }}</div>
                  <div v-if="click.city">City: {{ click.city }}</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>
    </ClientOnly>
  </div>
</template>
