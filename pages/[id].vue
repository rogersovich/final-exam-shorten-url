<script setup lang="ts">
type geoResponseType = {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
  readme: string;
};

const params = useRoute().params;
//@ts-ignore
const clients = useSupabaseClient<Database>();

// Get Params ID
if (!params.id) {
  throw createError({
    statusCode: 404,
    message: "Not Found",
  });
}

// Fetch API Link
const { data, error } = await useAsyncData<linksResponse>("link", async () => {
  const { data, error } = await clients
    .from("links")
    .select("*")
    .eq("key", params.id)
    .single();
  if (error) {
    throw error;
  }

  return data;
});

// Check Link if Error
if (error.value) {
  throw createError({
    statusCode: 404,
    message: "Link Not Found",
  });
}

// Redirect Short URL to Long URL && Insert to Table Clicks
if (data.value) {
  var clickForm: any = {}
  const userAgent = useUserAgent();
  if (userAgent) {
    const { data: geo } = await useFetch<geoResponseType>(
      "https://ipinfo.io/json"
    );

    clickForm.user_agent = userAgent.userAgent;
    clickForm.ip = geo.value?.ip;
    if (geo) {
      clickForm.country = geo.value?.country;
      clickForm.city = geo.value?.city;
    }
  }

  await clients.from("clicks").insert({
    link_id: data.value?.id,
    ...clickForm,
  });

  await useExternalRedirect(data?.value.long_url);
}
</script>
<template>
  <div class="min-h-screen fcc">
    Loading...
  </div>
</template>

<style scoped></style>
