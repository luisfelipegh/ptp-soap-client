<template>
    <div class="pt-5">
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card-title>
                            {{ $t('generals.request') }}
                        </v-card-title>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea disabled name="input-7-1" filled auto-grow value="">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card-title>
                            {{ $t('generals.response') }}
                        </v-card-title>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea disabled name="input-7-1" filled auto-grow value="">
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
    beforeMount() {
        
    },
}
</script>