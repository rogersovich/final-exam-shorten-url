export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  if(!user.value && to.name != 'auth'){
    return navigateTo('/auth')
  }

  if(user.value && to.name != 'dashboard'){
    abortNavigation()
    return navigateTo('/dashboard')
  }
})