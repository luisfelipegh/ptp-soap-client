<template>
    <v-card>
        <v-card-title class="headline">{{ $t('cash_services.services.davivienda.name') }}</v-card-title>
        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-col cols="12" md="5">
                    <v-text-field v-model="username" :label="$t('cash_services.services.davivienda.fields.username')"
                        required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                    <v-text-field v-model="password" :label="$t('cash_services.services.davivienda.fields.password')"
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
                    <component v-if="action" :is="action.value" :username="username" :password="password"></component>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import findByReference from './davivienda/FindByReference'
import Pay from './davivienda/Pay'
import Rollback from './davivienda/Rollback'

export default {
    name: 'DaviviendaService',
    components: {
        findByReference,
        Pay,
        Rollback
    },
    data() {
        return {
            username: '',
            password: '',
            showPassword: false,
            action: null,
            actions: [],
        }
    },
    beforeMount() {
        this.username = localStorage.getItem(`davivienda.username`)
        this.password = localStorage.getItem(`davivienda.password`)

        this.actions = [
            {
                text: this.$i18n.t('cash_services.services.davivienda.actions.findByReference'),
                value: findByReference
            },
            {
                text: this.$i18n.t('cash_services.services.davivienda.actions.pay'),
                value: Pay
            },
            {
                text: this.$i18n.t('cash_services.services.davivienda.actions.rollback'),
                value: Rollback
            }
        ]
    },
    methods: {
        saveAuth() {
            localStorage.setItem(`davivienda.username`, this.username)
            localStorage.setItem(`davivienda.password`, this.password)

            $nuxt.$emit('showToast', this.$t('generals.saved'))
        }
    }
};
</script>