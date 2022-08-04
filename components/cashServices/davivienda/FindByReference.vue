<template>
    <div>
        <Loading :loading="loading"></Loading>
        <v-form v-model="valid" ref="formFind" lazy-validation>
            <v-container class="pa-0">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-combobox v-model="paymentChannel" :items="paymentChannels"
                            :label="$t('cash_services.services.davivienda.fields.paymentChannel')"
                            :rules="rules.paymentChannel">
                        </v-combobox>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="agreement" :counter="8" :rules="rules.agreement" type="number"
                            :label="$t('cash_services.services.davivienda.fields.agreement')" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu v-model="invoiceDueDateMenu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="invoiceDueDate"
                                    :label="$t('cash_services.services.davivienda.fields.invoiceDueDate')"
                                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="invoiceDueDate" @input="invoiceDueDateMenu = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-combobox v-model="paymentSchedule" :items="paymentSchedules"
                            :label="$t('cash_services.services.davivienda.fields.paymentSchedule')"
                            :rules="rules.paymentSchedule">
                        </v-combobox>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="reference1" :counter="32" :rules="rules.reference1" type="number"
                            :label="$t('cash_services.services.davivienda.fields.reference1')" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="reference2" :counter="32" :rules="rules.reference2" type="number"
                            :label="$t('cash_services.services.davivienda.fields.reference2')" required>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="terminal" :counter="6" :rules="rules.terminal" type="number"
                            :label="$t('cash_services.services.davivienda.fields.terminal')" required>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="paymentAmount" :rules="rules.paymentAmount" prefix="COP" type="number"
                            :label="$t('cash_services.services.davivienda.fields.paymentAmount')" required>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" align="end">
                        <v-btn color="primary" class="mr-4" @click="findByReference" :loading="loading"
                            :disabled="!valid">
                            {{ $t('generals.query') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>
import davivienda from '../../../mixins/davivienda'
import Loading from '~/components/Loading.vue'

export default {
    name: "findByReference",
    mixins: [davivienda],
    components: {
        Loading
    },
    data() {
        return {
            valid: false,
            paymentDateMenu: false,
            invoiceDueDateMenu: false,
            paymentTimeMenu: false,
            paymentChannel: '',
            invoiceDueDate: '',
            agreement: '',
            paymentSchedule: '',
            reference1: '',
            reference2: '',
            terminal: '',
            paymentAmount: '',
        }
    },
    beforeMount() {
        if (localStorage.getItem(`davivienda.agreement`)) {
            this.agreement = localStorage.getItem(`davivienda.agreement`)
        }
        if (localStorage.getItem(`davivienda.paymentSchedule`)) {
            this.paymentSchedule = JSON.parse(localStorage.getItem(`davivienda.paymentSchedule`))
        }
        if (localStorage.getItem(`davivienda.terminal`)) {
            this.terminal = localStorage.getItem(`davivienda.terminal`)
        }
        if (localStorage.getItem(`davivienda.paymentChannel`)) {
            this.paymentChannel = JSON.parse(localStorage.getItem(`davivienda.paymentChannel`))
        }

        this.invoiceDueDate = (new Date()).toLocaleDateString('en-CA');
    },
    methods: {

        findByReference() {
            if (!this.$refs.formFind.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }

            let fecha = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let reference1 = this.getReference(this.reference1)
            let reference2 = this.getReference(this.reference2)

            let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.recaudosdavivienda.com/"
 xmlns:ns2="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
    <soapenv:Header>
        <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
            <wsse:UsernameToken>
                <wsse:Username>${this.username}</wsse:Username>
                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this.password}</wsse:Password>
            </wsse:UsernameToken>
        </wsse:Security>
    </soapenv:Header>
        <soapenv:Body>
            <ser:consultaRecaudo>
                <dto>
                    <canal>${this.paymentChannel.value}</canal>
                    <codigoBanco>${this.bankCode}</codigoBanco>
                    <codigoIAC>0000000000</codigoIAC>
                    <fechaVencimiento>${fecha}</fechaVencimiento>
                    <jornadaPago>${this.paymentSchedule.value}</jornadaPago>
                    <numeroConvenio>${this.agreement}</numeroConvenio>
                    <referencia1>${reference1}</referencia1>
                    <referencia2>${reference2}</referencia2>
                    <terminalRecaudo>${this.terminal}</terminalRecaudo>
                    <tipoMoneda>COP</tipoMoneda>
                    <valorFactura>${parseFloat(this.paymentAmount).toFixed(2)}</valorFactura>
                    <valorPagar>${parseFloat(this.paymentAmount).toFixed(2)}</valorPagar>
                </dto>
            </ser:consultaRecaudo>
        </soapenv:Body></soapenv:Envelope>`;

            localStorage.setItem(`davivienda.agreement`, this.agreement)
            localStorage.setItem(`davivienda.paymentSchedule`, JSON.stringify(this.paymentSchedule))
            localStorage.setItem(`davivienda.terminal`, this.terminal)
            localStorage.setItem(`davivienda.paymentChannel`, JSON.stringify(this.paymentChannel))

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('ServicioRecaudosDavivienda', xml);
        },
    }
}
</script>