<template>
    <v-form ref="formPay" v-model="valid" lazy-validation>
        <Loading :loading="loading"></Loading>
        <v-container class="pa-0">
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="agreement" :counter="16" :rules="rules.agreement" type="number"
                        :label="$t('cash_services.services.avVillas.fields.agreement')" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="paymentOffice" :counter="3" :rules="rules.paymentOffice" type="number"
                        :label="$t('cash_services.services.avVillas.fields.paymentOffice')" required>
                    </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-menu v-model="paymentDateMenu" :close-on-content-click="false" :nudge-right="40"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="paymentDate"
                                :label="$t('cash_services.services.avVillas.fields.paymentDate')"
                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="paymentDate" @input="paymentDateMenu = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                    <v-menu ref="menu" v-model="paymentTimeMenu" :close-on-content-click="false" :nudge-right="40"
                        :return-value.sync="paymentTimeMenu" transition="scale-transition" offset-y max-width="290px"
                        min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="paymentTime"
                                :label="$t('cash_services.services.avVillas.fields.paymentTime')"
                                prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on">
                            </v-text-field>
                        </template>
                        <v-time-picker v-if="paymentTimeMenu" v-model="paymentTime" full-width>
                        </v-time-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="reference1" :counter="16" :rules="rules.reference1" type="number"
                        :label="$t('cash_services.services.avVillas.fields.reference')" required>
                    </v-text-field>
                </v-col>
            </v-row>


            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="cashAmount" :rules="rules.cashAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.avVillas.fields.cashAmount')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="checkAmount" :rules="rules.checkAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.avVillas.fields.checkAmount')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="totalAmount" :rules="rules.totalAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.avVillas.fields.totalAmount')" required>
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
import av_villas from '../../../mixins/av_villas'

export default {
    name: "Pay",
    mixins: [av_villas],
    data() {
        return {
            valid: false,
            paymentDateMenu: false,
            paymentTimeMenu: false,
            agreement: '',
            paymentOffice: '',
            paymentTime: '',
            paymentDate: '',
            reference1: '',
            cashAmount: '',
            checkAmount: '',
            totalAmount: ''
        }
    },
    beforeMount() {
        if (localStorage.getItem(`avVillas.agreement`)) {
            this.agreement = localStorage.getItem(`avVillas.agreement`)
        }

        if (localStorage.getItem(`avVillas.paymentOffice`)) {
            this.paymentOffice = localStorage.getItem(`avVillas.paymentOffice`)
        }

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

            let date = this.getDate(this.paymentDate);
            let time = this.getTime(this.paymentTime) + '00'
            let reference1 = this.getReference(this.reference1)

            let cashAmount = !this.cashAmount ? 0 : parseInt(this.cashAmount)
            let checkAmount = !this.checkAmount ? 0 : parseInt(this.checkAmount)
            let totalAmount = !this.totalAmount ? 0 : parseFloat(this.totalAmount)

            if (cashAmount + checkAmount != totalAmount) {
                $nuxt.$emit('showToast', this.$i18n.t('validations.different', {
                    attribute: this.$i18n.t('cash_services.services.avVillas.fields.totalAmount'),
                    value: this.$i18n.t('cash_services.services.avVillas.fields.cashAmount') + ' + ' + this.$i18n.t('cash_services.services.avVillas.fields.checkAmount')
                }))

                return
            }

            let xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wses="http://organizacion.com/wsEstandar/">
            <soapenv:Header/>
            <soapenv:Body>
                <wses:oe_pagarFacturaEstandar>
                    <codBancoOrigen>${this.bankCode}</codBancoOrigen>
                    <codCanal>0</codCanal>
                    <nroProducto>${this.agreement}</nroProducto>
                    <codOficinaOrigen>${this.paymentOffice}</codOficinaOrigen>
                    <codCiudad>05001</codCiudad>
                    <fechaTransaccion>${date}</fechaTransaccion>
                    <horaTransaccion>${time}</horaTransaccion>
                    <fechaCompensacion>${date}</fechaCompensacion>
                    <referencia1>${reference1}</referencia1>
                    <referencia2>0000000000000000</referencia2>
                    <referencia3>0000000000000000</referencia3>
                    <referencia4>0000000000000000</referencia4>
                    <valorEfectivo>${cashAmount}00</valorEfectivo>
                    <valorCheque>${checkAmount}00</valorCheque>
                    <valorTotal>${totalAmount}00</valorTotal>
                    <nroAutorizacion>0</nroAutorizacion>
                </wses:oe_pagarFacturaEstandar>
            </soapenv:Body>
            </soapenv:Envelope>`

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('avvillas', xml);

            localStorage.setItem(`avVillas.agreement`, this.agreement)
            localStorage.setItem(`avVillas.paymentOffice`, this.paymentOffice)
        },
    }
}
</script>