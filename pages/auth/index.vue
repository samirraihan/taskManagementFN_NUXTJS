<template>
    <div class="bg-white p-8 rounded shadow-md">
        <h3 class="text-2xl font-semibold mb-4">Login</h3>
        <form @submit.prevent="handleSignin">
            <div class="mb-4">
                <label for="email" class="block text-gray-600">Email</label>
                <input v-model="form.email" type="email" id="email" class="w-full border p-2 rounded" placeholder="Enter your email">
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-600">Password</label>
                <input v-model="form.password" type="password" id="password" class="w-full border p-2 rounded" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;">
            </div>
            <button type="submit" class="w-full bg-green-500 text-white font-semibold py-2 rounded">Login</button>
        </form>
        <hr>
        <span class="text-l font-semibold mb-4">Need an account? </span>
        <NuxtLink to="/auth/signup">
            <span>Create now!</span>
        </NuxtLink>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

const borderDanger = ref('')
const loginFailed = ref(false)

useHead({
    title: "Login | Admin Panel Task Management System",
});

definePageMeta({
    layout: "auth",
});
const form = ref({
    email: '',
    password: '',
});

async function handleSignin() {
    if (form.value.email === "") {
        toastr.error('Please enter your email address');
        borderDanger.value = 'border border-danger'
        return;
    }
    if (form.value.password === "") {
        toastr.error('Please enter your password');
        borderDanger.value = 'border border-danger'
        return;
    }
    try {
        const isSigninSuccess = await authStore.signin(form.value);
        if (!isSigninSuccess) {
            loginFailed.value = true
            borderDanger.value = 'border border-danger'
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss" scoped></style>