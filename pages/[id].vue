<script setup lang="ts">
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
    .eq("key", `/${params.id}`)
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
    message: "Not Found",
  });
}

// Redirect Short URL to Long URL
if (data.value) {
  useExternalRedirect(data?.value.long_url);
}
</script>
<template>
  <div class="min-h-screen fcc">
    {{ data }}
  </div>
</template>

<style scoped></style>
