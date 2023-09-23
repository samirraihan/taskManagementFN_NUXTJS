<template>
  <main class="bg-gray-100">
    <div class="container mx-auto py-16">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold mb-3">{{ error.statusCode }}</h1>
        <h2 class="text-2xl font-semibold mb-4">{{ error.message }}</h2>
        <p class="text-gray-600 mb-6">Oops! 😖 Looks Like You Discovered an Error.</p>
        <button @click="handleError" class="bg-blue-500 text-white py-2 px-4 rounded-lg mb-6">Back to home</button>
      </div>
    </div>
  </main>
</template>

<script setup>
const { error } = defineProps({
  error: {
    type: Object,
    required: true,
  },
})
const handleError = () => clearError({ redirect: '/' })

useHead(() => ({
  title: error.statusCode + ' | ' + 'Task Management System'
}))
</script>

<style scoped></style>