<template>
    <main class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-96">
            <h4 class="mb-1 text-center">Verify your email ✉️</h4>
            <p class="text-start mb-4 text-center">
                Account activation link sent to your email address: <b class="text-primary"> {{ email }} </b> Please follow
                the
                link inside to continue.
            </p>
            <NuxtLink class="bg-primary text-white w-full py-2 mb-3 rounded text-center inline-block" to="/auth/"> Skip for
                now </NuxtLink>
            <p class="text-center mb-0">
                Didn't get the mail?
                <span class="text-primary cursor-pointer" @click="handleResend"> Resend </span>
            </p>
        </div>
    </main>
</template>

<script setup>
useHead({
    title: "Verify Email | Admin Panel Task Management System",
});
definePageMeta({
    layout: "auth",
});
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const route = useRoute();
const email = route.query.email;

function checkRoute() {
    if (!email) {
        navigateTo('/auth');
        return;
    }
}
checkRoute();

async function handleResend() {
    try {
        await authStore.resendVerificationEmail(email);
    } catch (error) {
        console.log('error', error);
    }
}
</script>

<style scoped>
/* Define your custom styles here if needed */
.btn-primary {
    background-color: #3490dc;
    /* Additional button styles can be added here */
}

.text-primary {
    color: #3490dc;
}

.cursor-pointer {
    cursor: pointer;
}
</style>