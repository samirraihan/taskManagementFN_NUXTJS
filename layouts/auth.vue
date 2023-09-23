<template>
    <div v-if="showLogin" class="flex flex-col justify-center items-center">
        <header class="bg-blue-500 text-white py-4 w-full">
            <div class="container mx-auto">
                <h2 class="text-2xl font-semibold">Task Management System</h2>
            </div>
        </header>

        <main class="mt-8">
            <div class="bg-white p-8 rounded shadow-md w-96">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script setup>
useHead(() => ({
    title: 'Login | Task Management System'
}))

import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const showLogin = ref(true);
if (authStore.isAuthenticated) {
    showLogin.value = false;
    navigateTo('/');
}
</script>

<style scoped></style>