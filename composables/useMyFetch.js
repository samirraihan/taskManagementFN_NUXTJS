import { useAuthStore } from '~/stores/auth';

export const useMyFetch = async (path, options) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    try {
        const response = await $fetch(
            config.public['apiBaseUrl'] + `${path}`,
            {
                ...options,
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Error:', error.response.status, '-', error.response.statusText);

        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            authStore.logout();
        }
    }
}