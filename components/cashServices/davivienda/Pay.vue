<template>
    <v-form ref="formPay" v-model="valid" lazy-validation>
        <Loading :loading="loading"></Loading>
        <v-container class="pa-0">
            <v-row>
                <v-col cols="12" md="4">
                    <v-combobox v-model="paymentChannel" :items="paymentChannels"
                        :label="$t('cash_services.services.davivienda.fields.paymentChannel')"
                        :rules="rules.paymentChannel">
                    </v-combobox>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="paymentConfirmationCode" :counter="8" :rules="rules.paymentConfirmationCode"
                        type="number" :label="$t('cash_services.services.davivienda.fields.paymentConfirmationCode')"
                        required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-menu v-model="paymentDateMenu" :close-on-content-click="false" :nudge-right="40"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="paymentDate"
                                :label="$t('cash_services.services.davivienda.fields.paymentDate')"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="paymentDate" @input="paymentDateMenu = false"></v-date-picker>
                    </v-menu>
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
                    <v-combobox v-model="paymentMethod" :items="paymentMethods"
                        :label="$t('cash_services.services.davivienda.fields.paymentMethod')"
                        :rules="rules.paymentMethod">
                    </v-combobox>
                </v-col>
                <v-col cols="12" md="4">
                    <v-menu ref="menu" v-model="paymentTimeMenu" :close-on-content-click="false" :nudge-right="40"
                        :return-value.sync="paymentTimeMenu" transition="scale-transition" offset-y max-width="290px"
                        min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="paymentTime"
                                :label="$t('cash_services.services.davivienda.fields.paymentTime')"
                                prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on">
                            </v-text-field>
                        </template>
                        <v-time-picker v-if="paymentTimeMenu" v-model="paymentTime" full-width>
                        </v-time-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                    <v-combobox v-model="paymentSchedule" :items="paymentSchedules"
                        :label="$t('cash_services.services.davivienda.fields.paymentSchedule')"
                        :rules="rules.paymentSchedule">
                    </v-combobox>
                </v-col>
                <v-col cols="12" md="4" v-if="isCheck">
                    <v-text-field v-model="checkNumber" :counter="9" :rules="rules.checkNumber" type="number"
                        :label="$t('cash_services.services.davivienda.fields.checkNumber')" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="agreement" :counter="8" :rules="rules.agreement" type="number"
                        :label="$t('cash_services.services.davivienda.fields.agreement')" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="paymentOffice" :counter="6" :rules="rules.paymentOffice" type="number"
                        :label="$t('cash_services.services.davivienda.fields.paymentOffice')" required>
                    </v-text-field>
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
                <v-col cols="12" md="4" v-if="isCheck">
                    <v-combobox v-model="exchangeType" :items="exchangeTypes"
                        :label="$t('cash_services.services.davivienda.fields.exchangeType')"
                        :rules="rules.exchangeType">
                    </v-combobox>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="invoiceAmount" :rules="rules.invoiceAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.davivienda.fields.invoiceAmount')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4" v-if="isCash">
                    <v-text-field v-model="cashAmount" :rules="rules.cashAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.davivienda.fields.cashAmount')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4" v-if="isCheck">
                    <v-text-field v-model="checkAmount" :rules="rules.checkAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.davivienda.fields.checkAmount')" required>
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="12" align="end">
                    <v-btn color="primary" class="mr-4" @click="pay" :loading="loading" :disabled="!valid">
                        {{ $t('generals.pay') }}
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
import davivienda from '../../../mixins/davivienda'

export default {
    name: "findByReference",
    mixins: [davivienda],
    data() {
        return {
            valid: false,
            paymentDateMenu: false,
            invoiceDueDateMenu: false,
            paymentTimeMenu: false,
            paymentChannel: '',
            paymentConfirmationCode: '',
            paymentDate: '',
            paymentTime: '',
            invoiceDueDate: '',
            paymentMethod: '',
            paymentSchedule: '',
            checkNumber: '',
            agreement: '',
            paymentOffice: '',
            reference1: '',
            reference2: '',
            terminal: '',
            exchangeType: '',
            cashAmount: '',
            checkAmount: '',
            invoiceAmount: ''
        }
    },
    computed: {
        isCheck() {
            return this.paymentMethod.value == 2 || this.paymentMethod.value == 3
        },
        isCash(){
            return this.paymentMethod.value != 2
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
        if (localStorage.getItem(`davivienda.paymentOffice`)) {
            this.paymentOffice = localStorage.getItem(`davivienda.paymentOffice`)
        }
        if (localStorage.getItem(`davivienda.paymentChannel`)) {
            this.paymentChannel = JSON.parse(localStorage.getItem(`davivienda.paymentChannel`))
        }

        this.invoiceDueDate = (new Date()).toLocaleDateString('en-CA');
        this.paymentDate = (new Date()).toLocaleDateString('en-CA');

        this.paymentTime = (new Date).toLocaleTimeString('en', {
            hour: '2-digit',
            minute: '2-digit', hour12: false
        })
    },
    methods: {
        pay() {
            if (!this.$refs.formPay.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }

            let dueDate = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let paymentDate = (this.paymentDate ? this.paymentDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let hours = (this.paymentTime ? this.paymentTime : (new Date()).toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit', hour12: false
            })).replaceAll(':', '') + '00'
            let reference1 = this.getReference(this.reference1)
            let reference2 = this.getReference(this.reference2)
            let cashAmount = !this.cashAmount ? 0.00 : parseFloat(this.cashAmount)
            let checkAmount = !this.checkAmount ? 0.00 : parseFloat(this.checkAmount)
            let invoiceAmount = !this.invoiceAmount ? 0 : parseFloat(this.invoiceAmount)
            let totalAmount = (parseFloat(cashAmount) + parseFloat(checkAmount))

            if (cashAmount + checkAmount != invoiceAmount) {
                $nuxt.$emit('showToast', this.$i18n.t('validations.different', {
                    attribute: this.$i18n.t('cash_services.services.davivienda.fields.totalAmount'),
                    value: this.$i18n.t('cash_services.services.davivienda.fields.cashAmount') + ' + ' + this.$i18n.t('cash_services.services.davivienda.fields.checkAmount')
                }))

                return
            }
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
                   <ser:notificacionRecaudo>
                   <dto>
                       <canalRecaudo>${this.paymentChannel.value}</canalRecaudo>
                       <codigoBanco>${this.bankCode}</codigoBanco>
                       <codigoConfirmacionRecaudo>${this.paymentConfirmationCode}</codigoConfirmacionRecaudo>
                       <codigoIAC>00000000000</codigoIAC>
                       <fechaRecaudo>${paymentDate}</fechaRecaudo>
                       <fechaVencimiento>${dueDate}</fechaVencimiento>
                       <formaPago>${this.paymentMethod.value}</formaPago>
                       <horaRecaudo>${hours}</horaRecaudo>
                       <jornadaRecaudo>${this.paymentSchedule.value}</jornadaRecaudo>
                       <numeroCheque>${this.checkNumber}</numeroCheque>
                       <numeroConvenio>${this.agreement}</numeroConvenio>
                       <oficinaRecaudo>${this.paymentOffice}</oficinaRecaudo>
                       <referencia1>${reference1}</referencia1>
                       <referencia2>${reference2}</referencia2>
                       <terminalRecaudo>${this.terminal}</terminalRecaudo>
                       <tipoCanje>${this.exchangeType.value ?? ''}</tipoCanje>
                       <tipoMoneda>COP</tipoMoneda>
                       <valorCheque>${checkAmount.toFixed(2)}</valorCheque>
                       <valorEfectivo>${cashAmount.toFixed(2)}</valorEfectivo>
                       <valorFactura>${invoiceAmount.toFixed(2)}</valorFactura>
                       <valorTotalRecaudado>${totalAmount.toFixed(2)}</valorTotalRecaudado>
                    </dto>
                </ser:notificacionRecaudo>
            </soapenv:Body></soapenv:Envelope>`

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('ServicioRecaudosDavivienda', xml);

            localStorage.setItem(`davivienda.paymentConfirmationCode`, this.paymentConfirmationCode)
            localStorage.setItem(`davivienda.paymentOffice`, this.paymentOffice)
        },
    }
}
</script>