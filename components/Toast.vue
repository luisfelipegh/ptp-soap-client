<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
        </v-snackbar>
    </div>
</template>
<script>

export default {
    data() {
        return {
            timeout: 2000,
            snackbar: false,
            text: ''
        }
    },
    created() {
        this.$nuxt.$on('showToast', (text, timeout = 2000) => {
            this.text = text
            this.timeout = timeout
            this.snackbar = true
        })
    }
}
</script>