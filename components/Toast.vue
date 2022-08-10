<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
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
            text: '',
            color: '',
        }
    },
    created() {
        this.$nuxt.$on('showToast', (text, timeout = 2000, color = 'primary') => {
            this.text = text
            this.timeout = timeout
            this.snackbar = true
            this.color = color
        })
    }
}
</script>