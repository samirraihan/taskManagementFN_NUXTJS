import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: localStorage.getItem("AUTH_STATUS") || false,
        user: JSON.parse(localStorage.getItem("AUTH_USER")) || null,
        token: localStorage.getItem("AUTH_TOKEN") || null,
        nextLogoutDateTime: localStorage.getItem("AUTH_NEXT_LOGOUT_DATETIME") || null,
        exprireOnBrowserClose: localStorage.getItem("AUTH_EXPIRE_ON_BROWSER_CLOSE") || false,
        loginDateTime: localStorage.getItem("AUTH_LOGIN_DATETIME") || null,
    }),
    actions: {
        async signup(formData) {
            try {
                const response = await useMyFetch(
                    "auth/signup", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });
                if (response.data.status === "success") {
                    navigateTo('/auth/verify-email?email=' + formData.email);
                    return true;
                }
            } catch (error) { }
        },
        async resendVerificationEmail(email) {
            try {
                const response = await useMyFetch(
                    "auth/resendVerificationEmail", {
                    method: "POST",
                    body: JSON.stringify({ email }),
                });
                if (response.data.status === "success") {
                    navigateTo('/auth/verify-email?email=' + email);
                    toastr.success(response.data.message);
                    return true;
                }
            } catch (error) { }
        },
        async signin(formData) {
            try {
                const response = await useMyFetch(
                    "auth/signin", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });
                if (response.data.status === "success") {
                    this.isAuthenticated = true;
                    this.user = response.data.user;
                    this.token = response.data.token;
                    localStorage.setItem("AUTH_STATUS", this.isAuthenticated);
                    localStorage.setItem("AUTH_TOKEN", response.data.token);
                    localStorage.setItem("AUTH_USER", JSON.stringify(response.data.user));
                    localStorage.setItem("AUTH_NEXT_LOGOUT_DATETIME", response.data.nextLogoutDateTime);
                    localStorage.setItem("AUTH_EXPIRE_ON_BROWSER_CLOSE", response.data.exprireOnBrowserClose);
                    localStorage.setItem("AUTH_LOGIN_DATETIME", new Date());
                    navigateTo('/');
                    return true;
                }
            } catch (error) { }
        },
        async logout() {
            try {
                const response = await useMyFetch(
                    "auth/logout", {
                    method: "POST"
                });
                if (response.data.status === "success") {
                    this.isAuthenticated = false;
                    this.user = null;
                    this.token = null;
                    localStorage.removeItem("AUTH_STATUS");
                    localStorage.removeItem("AUTH_TOKEN");
                    localStorage.removeItem("AUTH_USER");
                    localStorage.removeItem("AUTH_NEXT_LOGOUT_DATETIME");
                    localStorage.removeItem("AUTH_EXPIRE_ON_BROWSER_CLOSE");
                    localStorage.removeItem("AUTH_LOGIN_DATETIME");
                    navigateTo('/auth');
                    return true;
                }
            } catch (error) { }
        },
        async forgotPassword(email) {
            try {
                const response = await useMyFetch(
                    "auth/forgotPassword", {
                    method: "POST",
                    body: JSON.stringify({ email }),
                });
                if (response.data.status === "success") {
                    toastr.success(response.data.message);
                    return true;
                }
            } catch (error) { }
        },
        async resetPassword(formData) {
            try {
                const response = await useMyFetch(
                    "auth/resetPasswordProcess", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });
                if (response.data.status === "success") {
                    toastr.success(response.data.message);
                    navigateTo('/auth');
                    return true;
                }
            } catch (error) { }
        }
    },
})
