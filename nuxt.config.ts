const BASE_URL = process.env.BASE_URL || "http://localhost:8050/";
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8050/api/v1/";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000/";

export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            baseUrl: BASE_URL,
            apiBaseUrl: API_BASE_URL,
            backendUrl: BACKEND_URL
        }
    },
    ssr: false,
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],
    server: {
        port: 3000,
        host: 'localhost',
        timing: false,
    },
})
