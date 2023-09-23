<template>
    <div class="container mx-auto">
        <h3 class="mb-0">Welcome back, <span v-if="authStore.isAuthenticated">{{ authStore.user.name }}</span>
        </h3>
        <a @click="handleLogout" class="cursor-pointer flex items-center text-gray-500 hover:text-red-500 pb-5">
            <i class="ti ti-logout text-red-500"></i> Logout
        </a>
        <hr>
        <CommonError v-if="error" :error="error" @error="closeError" />
        <CommonSuccess v-if="success" :success="success" @success="closeSuccess" />
        <form v-if="!showCommentForm && users.length != 0" @submit.prevent="handleSubmit" class="w-96 items-center mx-auto py-10">
            <div class="mb-4">
                <label for="title" class="block text-gray-600">Title</label>
                <input v-model="form.title" type="text" class="w-full border p-2 rounded" placeholder="Enter task title">
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-600">Description</label>
                <textarea v-model="form.description" type="text" class="w-full border p-2 rounded"
                    placeholder="Enter description"></textarea>
            </div>
            <div class="mb-4">
                <ul class="grid grid-cols-2 gap-4">
                    <li v-for="(user, index) in users" :key="index" class="...">
                        <label>
                            <input type="checkbox" :value="user.id" v-model="form.user_ids" class="mr-2" />
                            {{ user.name }}
                        </label>
                    </li>
                </ul>
            </div>
            <input v-if="isEdit" v-model="form.id" type="hidden" class="w-full border p-2 rounded">
            <button :disabled="btnDisabled" :class="btnDisabled ? 'bg-gray-500' : 'bg-green-500'" type="submit" class="w-full text-white font-semibold py-2 rounded"><span
                    v-if="isCreate">Submit</span><span v-else>Update</span></button>
        </form>
        <form v-if="showCommentForm" @submit.prevent="handleCommentSubmit" class="w-96 items-center mx-auto py-10">
            <div class="mb-4">
                <label for="body" class="block text-gray-600">Comment</label>
                <textarea v-model="commentForm.body" class="w-full border p-2 rounded"
                    placeholder="Enter Comment"></textarea>
            </div>
            <input v-model="form.id" type="hidden" class="w-full border p-2 rounded">
            <button :disabled="btnDisabled" :class="btnDisabled ? 'bg-gray-500' : 'bg-green-500'" type="submit" class="w-full text-white font-semibold py-2 rounded">Submit</button>
        </form>
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Task Title
                    </th>
                    <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Description
                    </th>
                    <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Comments
                    </th>
                    <th
                        class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="task in tasks" :key="task.id">
                    <td class="px-6 py-4 whitespace-no-wrap">
                        {{ task.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                        {{ task.title }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                        {{ task.description }}
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap">
                        <ul v-for="comment in task.comments" :key="comment.id">
                            <li>* {{ comment.body }}</li>
                        </ul>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
                        <button @click="handleEdit(task.id)" class="text-indigo-600 hover:text-indigo-900 mr-2">
                            Edit
                        </button>
                        <button @click="handleDelete(task.id)" class="text-red-600 hover:text-red-900">
                            Delete
                        </button>
                        <button @click="handleComment(task.id)" class="text-blue-600 hover:text-blue-900">
                            Comment
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <CommonPagination @change="refetchData" :currentPage="currentPage" :perPage="perPage" :totalPages="totalPages"
            :totalData="totalData" />
    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
definePageMeta({
    middleware: 'auth'
});
const pageTitle = ref("Task List");
const currentApiUrl = ref("admin/tasks/");
useHead({
    title: pageTitle.value + " | Admin Panel Task Management System",
});
const config = useRuntimeConfig();

const isCreate = ref(true);
const isEdit = ref(false);
const tasks = ref([]);
const users = ref([]);
const currentPage = ref(1);
const perPage = ref(9);
const totalPages = ref(0);
const totalData = ref(0);
const currentFormData = ref({});
const error = ref(null);
const success = ref(null);
const btnDisabled = ref(false);
const showCommentForm = ref(false);

const form = ref({
    id: "",
    title: "",
    description: "",
    user_ids: []
});

const commentForm = ref({
    id: "",
    body: "",
});

async function handleLogout() {
    await authStore.logout();
}

async function fetchData() {
    try {
        const response = await useMyFetch(
            currentApiUrl.value + "fetch",
            {
                params: {
                    page: currentPage.value,
                    perPage: perPage.value,
                }
            }
        );
        if (response) {
            tasks.value = response.data.getData.data;
            users.value = response.data.users;
            currentPage.value = response.data.getData.current_page;
            totalPages.value = response.data.getData.last_page;
            totalData.value = response.data.getData.total;
        }
    } catch (error) { }
}

fetchData();

function refetchData(pageNumber) {
    currentPage.value = pageNumber;
    fetchData();
}

function resetFormData() {
    form.value.id = "";
    form.value.title = "";
    form.value.description = "";
    form.value.user_ids = [];
    commentForm.value.id = "";
    commentForm.value.body = "";
}

async function handleSubmit() {
    try {
        const endpoint = isCreate.value ? currentApiUrl.value + "store" : currentApiUrl.value + `${form.value.id}/update`;

        if (form.value.title === "") {
            success.value = null;
            error.value = "Title is required.";
            return;
        }

        if (form.value.description === "") {
            success.value = null;
            error.value = "Description is required.";
            return;
        }

        if (isEdit && form.value.user_ids.length === 0) {
            success.value = null;
            error.value = "Assign user is required.";
            return;
        }

        if ((JSON.stringify(currentFormData.value) === JSON.stringify(form.value)) && isEdit.value === true) {
            success.value = null;
            error.value = "Nothing to Update! No changes made.";
            return;
        }
        
        btnDisabled.value = true;

        const response = await useMyFetch(endpoint, {
            method: "POST",
            body: JSON.stringify(form.value)
        });

        if (response.status === "success") {
            btnDisabled.value = false;
            error.value = null;
            success.value = response.message;
            resetFormData();
            fetchData();
            if (isEdit.value) {
                isCreate.value = true;
                isEdit.value = false;
            }
        } else {
            btnDisabled.value = false;
            success.value = null;
            error.value = response.data.message;
        }
    } catch (error) {
        btnDisabled.value = false;
        success.value = null;
        error.value = "Something went wrong! Please try again later.";
        console.error('Error:', error.response.status, '-', error.response.statusText);
    }
}

async function handleEdit(id) {
    try {
        const response = await useMyFetch(currentApiUrl.value + `${id}/edit`);

        if (response) {
            isCreate.value = false;
            isEdit.value = true;

            const data = response.data.getData;
            const formData = {
                id: data.id,
                title: data.title,
                description: data.description,
                user_ids: data.users.map((user) => user.id)
            };
            form.value = { ...formData };
            currentFormData.value = { ...formData };
        }
    } catch (error) {
        console.log('Error editing record:', error);
        success.value = null;
        error.value = 'An error occurred while editing the record.';
    }
}

async function handleDelete(id) {
    try {
        const { data } = await useMyFetch(currentApiUrl.value + `${id}/delete`, {
            method: 'POST'
        });

        if (data.status === 'success') {
            error.value = null;
            success.value = data.message;
            fetchData();
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        success.value = null;
        error.value = 'An error occurred while deleting the record.';
    }
}

function closeError() {
    error.value = null;
}

function closeSuccess() {
    success.value = null;
}

function handleComment(id) {
    showCommentForm.value = true;
    commentForm.value.id = id;
}

async function handleCommentSubmit() {
    try {
        const endpoint = currentApiUrl.value + `${commentForm.value.id}/comment`;

        if (commentForm.value.body === "") {
            success.value = null;
            error.value = "Comment is required.";
            return;
        }

        btnDisabled.value = true;

        const response = await useMyFetch(endpoint, {
            method: "POST",
            body: JSON.stringify(commentForm.value)
        });

        if (response.status === "success") {
            btnDisabled.value = false;
            error.value = null;
            success.value = response.message;
            resetFormData();
            fetchData();
            showCommentForm.value = false;
        } else {
            btnDisabled.value = false;
            success.value = null;
            error.value = response.data.message;
        }
    } catch (error) {
        btnDisabled.value = false;
        success.value = null;
        error.value = "Something went wrong! Please try again later.";
        console.error('Error:', error.response.status, '-', error.response.statusText);
    }
}
</script>
<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>