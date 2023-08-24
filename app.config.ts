export default defineAppConfig({
  ui: {
    primary: "purple",
    formGroup: {
      container: "mb-4",
      label: {
        base: "mb-1.5",
      },
      error: "text-sm text-red-500 dark:text-red-400 mt-2",
    },
    notifications: {
      position: "bottom-0 right-0",
    },
  },
});
