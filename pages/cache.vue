<template>
    <v-container>
        <h1 class="pb-5">{{ $t('cache.title') }}</h1>
        <v-card>
            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-col cols="12" md="5">
                        <v-text-field v-model="username" :label="$t('cache.fields.username')" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field v-model="password" :label="$t('cache.fields.password')" required
                            @click:append="showPassword = !showPassword"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-btn color="primary" class="mr-4" @click="saveAuth()">{{ $t('generals.save') }}
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-combobox v-model="action" :items="actions" :label="$t('cash_services.fields.action')">
                        </v-combobox>
                    </v-col>
                </v-row>
                <v-row align="center" class="mx-0">
                    <v-col cols="12" md="12">
                        <component v-if="action" :is="action.value" :username="username" :password="password">
                        </component>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import ClearCache from '../components/cache/ClearCache.vue'

export default {
    components: {
        ClearCache
    },
    data() {
        return {
            showPassword: false,
            username: '',
            password: '',
            actions: [],
            action: null,
        }
    },
    beforeMount() {
        this.username = localStorage.getItem(`cache.username`)
        this.password = localStorage.getItem(`cache.password`)

        this.actions = [
            {
                text: this.$i18n.t('cache.actions.clear'),
                value: ClearCache
            },
        ]
    },
    methods: {
        saveAuth() {
            localStorage.setItem(`cache.username`, this.username)
            localStorage.setItem(`cache.password`, this.password)

            $nuxt.$emit('showToast', this.$t('generals.saved'))
        }
    }
}
</script>