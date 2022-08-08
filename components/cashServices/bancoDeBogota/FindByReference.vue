<template>
    <div>
        <Loading :loading="loading"></Loading>
        <v-form v-model="valid" ref="formFind" lazy-validation>
            <v-container class="pa-0">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="agreement" :rules="rules.agreement" type="number"
                            :label="$t('cash_services.services.bancoDeBogota.fields.agreement')" required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu v-model="paymentDateMenu" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="paymentDate"
                                    :label="$t('cash_services.services.bancoDeBogota.fields.paymentDate')"
                                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="paymentDate" @input="paymentDateMenu = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-menu ref="menu" v-model="paymentTimeMenu" :close-on-content-click="false" :nudge-right="40"
                            :return-value.sync="paymentTimeMenu" transition="scale-transition" offset-y
                            max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="paymentTime"
                                    :label="$t('cash_services.services.bancoDeBogota.fields.paymentTime')"
                                    prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on">
                                </v-text-field>
                            </template>
                            <v-time-picker v-if="paymentTimeMenu" v-model="paymentTime" full-width>
                            </v-time-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="reference" :counter="24" :rules="rules.reference" type="number"
                            :label="$t('cash_services.services.bancoDeBogota.fields.reference')" required>
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
import BancoDeBogota from '../../../mixins/banco_de_bogota'
import Loading from '~/components/Loading.vue'

export default {
    mixins: [BancoDeBogota],
    components: {
        Loading
    },
    data() {
        return {
            valid: false,
            loading: false,
            agreement: '',
            reference: '',
            paymentDateMenu: false,
            paymentDate: '',
            paymentTimeMenu: false,
            paymentTime: '',
        }
    },
    beforeMount() {
        if (localStorage.getItem(`bancoDeBogota.agreement`)) {
            this.agreement = localStorage.getItem(`bancoDeBogota.agreement`)
        }

        this.paymentDate = (new Date()).toLocaleDateString('en-CA');

        this.paymentTime = (new Date).toLocaleTimeString('en', {
            hour: '2-digit',
            minute: '2-digit', hour12: false
        })
    },
    methods: {
        findByReference() {
            if (!this.$refs.formFind.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }
            
            let clientDt = this.getClientDt()

            let xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:doc="http://tempuri.org/DocumentTypes" xmlns:tem="http://tempuri.org/">
            <soapenv:Header>
                <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
                    <wsse:UsernameToken>
                        <wsse:Username>${this.username}</wsse:Username>
                        <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this.password}</wsse:Password>
                    </wsse:UsernameToken>
                </wsse:Security>
            </soapenv:Header>
            <soapenv:Body>
                <doc:ConsultarFacturaPorNumero>
                    <tem:cadenaIFX>&lt;IFX&gt;
                        &lt;SignonRq&gt;
                            &lt;SignonPswd&gt;
                                &lt;CustId&gt;
                                    &lt;SPName&gt;Placetopay Evertec S.A.S&lt;/SPName&gt;
                                    &lt;CustPermId&gt;${this.agreement}&lt;/CustPermId&gt;
                                    &lt;CustLoginId&gt;${this.agreement}&lt;/CustLoginId&gt;
                                &lt;/CustId&gt;
                            &lt;/SignonPswd&gt;
                            &lt;ClientDt&gt;${clientDt}&lt;/ClientDt&gt;
                        &lt;/SignonRq&gt;
                        &lt;PresSvcRq&gt;
                            &lt;BillInqRq&gt;
                                &lt;MsgRqHdr&gt;
                                    &lt;NetworkTrnInfo&gt;
                                        &lt;NetworkOwner&gt;OFC&lt;/NetworkOwner&gt;
                                        &lt;OriginatorName&gt;1111&lt;/OriginatorName&gt;
                                        &lt;BankId&gt;${this.bankCode}&lt;/BankId&gt;
                                    &lt;/NetworkTrnInfo&gt;
                                &lt;/MsgRqHdr&gt;
                                &lt;BillerId&gt;
                                    &lt;SPName&gt;Placetopay Evertec S.A.S&lt;/SPName&gt;
                                    &lt;BillerNum&gt;&lt;/BillerNum&gt;
                                    &lt;BillInfo&gt;
                                        &lt;BillRefInfo1&gt;${this.reference}&lt;/BillRefInfo1&gt;
                                        &lt;BillRefInfo2&gt;0&lt;/BillRefInfo2&gt;
                                        &lt;BillRefInfo3&gt;0&lt;/BillRefInfo3&gt;
                                        &lt;BillRefInfo4&gt;0&lt;/BillRefInfo4&gt;
                                        &lt;BillRefInfo5&gt;0&lt;/BillRefInfo5&gt;
                                    &lt;/BillInfo&gt;
                                &lt;/BillerId&gt;
                                &lt;SelRangePrcDt&gt;
                                    &lt;PrcDt&gt;${clientDt}&lt;/PrcDt&gt;
                                &lt;/SelRangePrcDt&gt;
                            &lt;/BillInqRq&gt;
                        &lt;/PresSvcRq&gt;
                        &lt;SignoffRq&gt;
                            &lt;CustId&gt;
                                &lt;SPName&gt;Placetopay Evertec S.A.S&lt;/SPName&gt;
                                &lt;CustPermId&gt;${this.agreement}&lt;/CustPermId&gt;
                                &lt;CustLoginId&gt;${this.agreement}&lt;/CustLoginId&gt;
                            &lt;/CustId&gt;
                        &lt;/SignoffRq&gt;
                    &lt;/IFX&gt;</tem:cadenaIFX>
                    </doc:ConsultarFacturaPorNumero>
                </soapenv:Body>
            </soapenv:Envelope>
`
            $nuxt.$emit('newSoapRequest', xml)
            localStorage.setItem(`bancoDeBogota.agreement`, this.agreement)
            this.makeRequest('bancodebogota', xml);
        }
    }
}
</script>