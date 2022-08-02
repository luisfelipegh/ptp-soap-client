<template>
    <div class="pt-5" v-if="response || request">
        <v-alert v-if="response" dense :type="response.status === 200 ? 'success' : 'error'">
            {{ response.status }}
        </v-alert>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-row align="center" justify="space-between" justify-space-between>
                            <v-card-title>
                                {{ $t('generals.request') }}
                            </v-card-title>
                            <v-btn color="primary" class="mr-4" @click="copyButton(request)">{{
                                    $t('generals.copy_request')
                            }}</v-btn>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea disabled name="input-7-1" filled auto-grow :value="request">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-row align="center" justify="space-between" justify-space-between>
                            <v-card-title>
                                {{ $t('generals.response') }}
                            </v-card-title>
                            <v-btn color="primary" class="mr-4" @click="copyButton(response.data)">{{
                                    $t('generals.copy_response')
                            }}</v-btn>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea disabled name="input-7-1" filled auto-grow :value="response.data">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>

export default {
    data() {
        return {
            request: '',
            response: ''
        }
    },
    created() {
        this.$nuxt.$on('cleanRequestResponse', () => {
            this.response = ''
            this.request = ''
        })

        this.$nuxt.$on('newSoapRequest', (request) => {
            this.response = ''
            this.request = request
        })

        this.$nuxt.$on('newSoapResponse', (response) => {
            if(typeof response.data === 'object'){
                response.data = JSON.stringify(response.data)
            }
            this.response = response
        })
    },
    methods: {
        copyButton(value) {
            navigator.clipboard.writeText(value)
            $nuxt.$emit('showToast', this.$t('generals.copied'))
        }
    }
}
</script>