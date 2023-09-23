<template>
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Success! </strong>
        <span class="block sm:inline">{{ success }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg @click="$emit('success')" class="fill-current h-6 w-6 text-green-500" role="button"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.93 2.93a1 1 0 1 1-1.414-1.414l2.93-2.93-2.93-2.93a1 1 0 1 1 1.414-1.414l2.93 2.93 2.93-2.93a1 1 0 1 1 1.414 1.414l-2.93 2.93 2.93 2.93a1 1 0 0 1 0 1.414z">
                </path>
            </svg>
        </span>
    </div>
</template>

<script setup>
const { success } = defineProps({
    success: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(['success']);
</script>