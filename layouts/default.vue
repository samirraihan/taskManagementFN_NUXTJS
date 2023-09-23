<template>
    <main>
        <div class="bg-gray-100">
            <header class="bg-blue-500 text-white py-4 w-full">
                <div class="container mx-auto">
                    <h2 class="text-2xl font-semibold">Task Management System</h2>
                </div>
            </header>
            <div class="flex justify-center items-center min-h-fit">
                <div class="w-full h-full bg-gray-100">
                    <div class="max-w-screen-xl mx-auto px-4">
                        <div class="bg-white rounded-lg shadow-lg p-4">
                            <div class="bg-white flex-grow-1">
                                <div class="container mx-auto py-8">
                                    <LazyNuxtPage />
                                </div>
                                <LazyCommonFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import moment from 'moment';
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

useHead(() => ({
    title: 'Admin Panel | Task Management System'
}))

const currentDateTime = ref(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
const availableNextLogoutDateTime = ref(localStorage.getItem('AUTH_NEXT_LOGOUT_DATETIME'));
if (currentDateTime.value > availableNextLogoutDateTime.value) {
    await authStore.logout();
}

</script>

<style scoped></style>