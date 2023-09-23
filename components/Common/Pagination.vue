<template>
    <main>
        <div class="row pt-4">
            <div class="col-md-6">
                <ul class="flex justify-end space-x-2">
                    <li class="page-item cursor-pointer" :class="{ 'opacity-50 pointer-events-none': currentPage === 1 }">
                        <a @click="$emit('change', currentPage - 1)" class="page-link">Prev</a>
                    </li>
                    <li class="page-item cursor-pointer" v-if="currentPage > 2">
                        <a @click="$emit('change', 1)" class="page-link">1</a>
                    </li>
                    <li class="page-item cursor-pointer" v-if="currentPage > 3">
                        <span class="page-link">...</span>
                    </li>
                    <li class="page-item cursor-pointer" v-if="currentPage > 1">
                        <a @click="$emit('change', currentPage - 1)" class="page-link">{{ currentPage - 1 }}</a>
                    </li>
                    <li class="page-item active text-blue-500 cursor-pointer">
                        <span class="page-link">{{ currentPage }}</span>
                    </li>
                    <li class="page-item cursor-pointer" v-if="currentPage < totalPages">
                        <a @click="$emit('change', currentPage + 1)" class="page-link">{{ currentPage + 1 }}</a>
                    </li>
                    <li class="page-item cursor-pointer" v-if="currentPage < totalPages - 2">
                        <span class="page-link">...</span>
                    </li>
                    <li class="page-item cursor-pointer" v-if="currentPage < totalPages - 1">
                        <a @click="$emit('change', totalPages)" class="page-link">{{ totalPages }}</a>
                    </li>
                    <li class="page-item cursor-pointer" :class="{ 'opacity-50 pointer-events-none': currentPage === totalPages }">
                        <a @click="$emit('change', currentPage + 1)" class="page-link">Next</a>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup>
const { currentPage, perPage, totalPages, totalData } = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    perPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
    totalData: {
        type: Number,
        required: true,
    },
});
const emits = defineEmits(["change"]);
</script>
<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>