<template>
        <div class="bg-white p-8 rounded shadow-md">
            <h3 class="text-2xl font-semibold mb-4">Register</h3>
            <form @submit.prevent="handleSignUp">
                <div class="mb-4">
                    <label for="fullname" class="block text-gray-600">Full Name</label>
                    <input v-model="form.name" type="fullname" class="w-full border p-2 rounded"
                        placeholder="Enter your full name">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-600">Email</label>
                    <input v-model="form.email" type="email" class="w-full border p-2 rounded"
                        placeholder="Enter your email">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-600">Password</label>
                    <input v-model="form.password"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        type="password" class="w-full border p-2 rounded">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-600">Confirm Password</label>
                    <input v-model="form.password_confirmation"
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        type="password" class="w-full border p-2 rounded">
                </div>
                <button type="submit" class="w-full bg-green-500 text-white font-semibold py-2 rounded">Register</button>
            </form>
            <hr>
            <span class="text-l font-semibold mb-4">Already have an account? </span>
            <NuxtLink to="/auth/">
                <span>Login now!</span>
            </NuxtLink>
        </div>
</template>

<script setup>
useHead({
    title: "Sign Up | Admin Panel Task Management System",
});
definePageMeta({
    layout: "auth",
});

import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
});

async function handleSignUp() {
    if (form.value.name === "") {
        console.log('Please enter your full name');
        return;
    }
    if (form.value.email === "") {
        console.log('Please enter your email address');
        return;
    }
    if (!form.value.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        console.log('Please enter a valid email address');
        return;
    }
    if (form.value.password === "") {
        console.log('Please enter your password');
        return;
    }
    if (!form.value.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)) {
        console.log([
            '<ul>',
            '<li>Password must be more than 8 characters long</li>',
            '<li>Must contain at least one uppercase letter</li>',
            '<li>Must contain at least one lowercase letter</li>',
            '<li>Must contain at least one digit</li>',
            '<li>Must contain at least one special character (e.g. !, @, #, $, %, ^, &, *)</li>',
            '<li>Max 20 characters</li>',
            '</ul>'
        ]);
        return;
    }
    if (form.value.password !== form.value.password_confirmation) {
        console.log('Password and confirm password not match');
        return;
    }

    try {
        await authStore.signup(form.value);
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss" scoped></style>