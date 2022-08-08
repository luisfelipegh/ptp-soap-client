<template>
    <v-card>
        <v-card-title class="headline">{{ $t('cash_services.services.bancoDeBogota.name') }}</v-card-title>
        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-col cols="12" md="5">
                    <v-text-field v-model="username" :label="$t('cash_services.services.bancoDeBogota.fields.username')"
                        required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                    <v-text-field v-model="password" :label="$t('cash_services.services.bancoDeBogota.fields.password')"
                        required @click:append="showPassword = !showPassword"
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
                    <component :username="username" :password="password" v-if="action" :is="action.value"></component>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import FindByReference from './bancoDeBogota/FindByReference.vue'
import Pay from './bancoDeBogota/Pay.vue'
import Rollback from './bancoDeBogota/Rollback.vue'

export default {
    components: {
        FindByReference,
        Pay,
        Rollback
    },
    data() {
        return {
            username: '',
            password: '',
            showPassword: false,
            action: null,

        }
    },
    beforeMount() {
        this.username = localStorage.getItem(`bancoDeBogota.username`)
        this.password = localStorage.getItem(`bancoDeBogota.password`)

        this.actions = [
            {
                text: this.$i18n.t('cash_services.services.bancoDeBogota.actions.findByReference'),
                value: FindByReference
            },
            {
                text: this.$i18n.t('cash_services.services.bancoDeBogota.actions.pay'),
                value: Pay
            },
            {
                text: this.$i18n.t('cash_services.services.bancoDeBogota.actions.rollback'),
                value: Rollback
            },
        ]
    },
    methods: {
        saveAuth() {
            localStorage.setItem(`bancoDeBogota.username`, this.username)
            localStorage.setItem(`bancoDeBogota.password`, this.password)

            $nuxt.$emit('showToast', this.$t('generals.saved'))
        }
    }
}


</script>