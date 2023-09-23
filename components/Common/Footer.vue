<template>
    <footer class="bg-footer-theme">
        <div class="container mx-auto py-2">
            <div class="flex items-center justify-between flex-wrap">
                <div class="text-white">
                    © {{ developedYear }},
                    Developed by <a href="https://www.linkedin.com/in/samirraihan/" target="_blank"
                        class="font-semibold">Samir Raihan</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const developedYear = ref(2023);
const currentYear = new Date().getFullYear();
const currentShortYear = new Date().getFullYear().toString().slice(-2);
if (developedYear.value === currentYear) {
    developedYear.value = currentYear;
} else {
    developedYear.value = `${developedYear.value} - ${currentShortYear}`;
}
</script>

<style scoped></style>