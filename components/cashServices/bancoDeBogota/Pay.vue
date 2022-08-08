<template>
    <v-form ref="formPay" v-model="valid" lazy-validation>
        <Loading :loading="loading"></Loading>
        <v-container class="pa-0">
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="agreement" :counter="8" :rules="rules.agreement" type="number"
                        :label="$t('cash_services.services.bancoDeBogota.fields.agreement')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="paymentConfirmationCode" :counter="20" :rules="rules.paymentConfirmationCode"
                        type="number" :label="$t('cash_services.services.bancoDeBogota.fields.paymentConfirmationCode')"
                        required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-combobox v-model="paymentSchedule" :items="paymentSchedules"
                        :label="$t('cash_services.services.bancoDeBogota.fields.paymentSchedule')"
                        :rules="rules.paymentSchedule">
                    </v-combobox>
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
                        :return-value.sync="paymentTimeMenu" transition="scale-transition" offset-y max-width="290px"
                        min-width="290px">
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
                <v-col cols="12" md="4">
                    <v-text-field v-model="cashAmount" :rules="rules.cashAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.bancoDeBogota.fields.cashAmount')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="checkAmount" :rules="rules.checkAmount" prefix="COP" type="number"
                        :label="$t('cash_services.services.bancoDeBogota.fields.checkAmount')" required>
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

import BancoDeBogota from '../../../mixins/banco_de_bogota'
import Loading from '~/components/Loading.vue'

export default {
    components: {
        Loading
    },
    mixins: [BancoDeBogota],
    data() {
        return {
            valid: false,
            agreement: '',
            paymentDate: '',
            paymentTime: '',
            paymentConfirmationCode: '',
            paymentSchedule: '',
            cashAmount: '',
            checkAmount: '',
            paymentDateMenu: false,
            paymentDate: '',
            paymentTimeMenu: false,
            paymentTime: '',
            reference: ''
        }
    },
    beforeMount() {
        if (localStorage.getItem(`bancoDeBogota.agreement`)) {
            this.agreement = localStorage.getItem(`bancoDeBogota.agreement`)
        }

        if (localStorage.getItem(`bancoDeBogota.paymentSchedule`)) {
            this.paymentSchedule = JSON.parse(localStorage.getItem(`bancoDeBogota.paymentSchedule`))
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

            let clientDt = this.getClientDt()

            let cashAmount = !this.cashAmount ? 0 : parseInt(this.cashAmount) * 100
            let checkAmount = !this.checkAmount ? 0 : parseInt(this.checkAmount) * 100
            let totalAmount = checkAmount + cashAmount

            let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:doc="http://tempuri.org/DocumentTypes" xmlns:tem="http://tempuri.org/">
    <soapenv:Header>
        <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
            <wsse:UsernameToken>
                <wsse:Username>${this.username}</wsse:Username>
                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this.password}</wsse:Password>
            </wsse:UsernameToken>
        </wsse:Security>
    </soapenv:Header>
    <soapenv:Body>
        <doc:RegistrarPagoIFX>
            <tem:cadenaIFX>&lt;?xml version = &apos;1.0&apos; encoding = &apos;UTF-8&apos;?&gt;
&lt;IFX&gt;
  &lt;SignonRq&gt;
    &lt;SignonPswd&gt;
      &lt;CustId&gt;
        &lt;SPName&gt;Placetopay Evertec S.A.S&lt;/SPName&gt;
        &lt;CustPermId&gt;1234567890&lt;/CustPermId&gt;
		&lt;CustLoginId&gt;1234567890&lt;/CustLoginId&gt;
      &lt;/CustId&gt;
    &lt;/SignonPswd&gt;
    &lt;ClientDt&gt;${clientDt}&lt;/ClientDt&gt;
  &lt;/SignonRq&gt;
  &lt;PaySvcRq&gt;
    &lt;PmtAddRq&gt;
      &lt;RqUID&gt;${this.paymentConfirmationCode}&lt;/RqUID&gt;
      &lt;MsgRqHdr&gt;
        &lt;NetworkTrnInfo&gt;
          &lt;NetworkOwner&gt;OFC&lt;/NetworkOwner&gt;
          &lt;OriginatorName&gt;1021&lt;/OriginatorName&gt;
          &lt;BankId&gt;${this.bankCode}&lt;/BankId&gt;
        &lt;/NetworkTrnInfo&gt;
      &lt;/MsgRqHdr&gt;
	  &lt;PmtInfo&gt;	  
			&lt;BillerId&gt;
			&lt;BillerNum&gt;&lt;/BillerNum&gt;
			&lt;/BillerId&gt;		
		&lt;CurAmt&gt;
			&lt;CurCode&gt;COP&lt;/CurCode&gt;
			&lt;Amt&gt;${totalAmount}&lt;/Amt&gt;
			&lt;Efc&gt;${cashAmount}&lt;/Efc&gt;
			&lt;Chq&gt;${checkAmount}&lt;/Chq&gt;
		&lt;/CurAmt&gt;		
		&lt;DepAcctIdTo&gt;
			&lt;AcctId&gt;${this.agreement}&lt;/AcctId&gt;
			&lt;AcctType&gt;1&lt;/AcctType&gt;
		&lt;/DepAcctIdTo&gt;		
		&lt;ImmediatePmt&gt;${this.paymentSchedule.value}&lt;/ImmediatePmt&gt;		
		&lt;DepAcctIdFrom&gt;
			&lt;BankInfo&gt;
				&lt;BankId&gt;${this.bankCode}&lt;/BankId&gt;
			&lt;/BankInfo&gt;
		&lt;/DepAcctIdFrom&gt;		
		&lt;PrcDt&gt;20220808&lt;/PrcDt&gt;		
		&lt;RemitInfo&gt;
			&lt;BillRefInfo&gt;&lt;/BillRefInfo&gt;
			&lt;RefInfo&gt;
				&lt;RefId1&gt;${this.reference}&lt;/RefId1&gt;			
				&lt;RefId2&gt;&lt;/RefId2&gt;
				&lt;RefId3&gt;&lt;/RefId3&gt;
				&lt;RefId4&gt;&lt;/RefId4&gt;
				&lt;RefId5&gt;&lt;/RefId5&gt;
			&lt;/RefInfo&gt;			
		&lt;/RemitInfo&gt;		
	  &lt;/PmtInfo&gt;	  
    &lt;/PmtAddRq&gt;			
  &lt;/PaySvcRq&gt;
  &lt;SignoffRq&gt;
    &lt;CustId&gt;
      &lt;SPName&gt;Placetopay Evertec S.A.S&lt;/SPName&gt;
      &lt;CustPermId&gt;1234567890&lt;/CustPermId&gt;
      &lt;CustLoginId&gt;1234567890&lt;/CustLoginId&gt;
    &lt;/CustId&gt;
  &lt;/SignoffRq&gt;
&lt;/IFX&gt;</tem:cadenaIFX>
        </doc:RegistrarPagoIFX>
    </soapenv:Body>
</soapenv:Envelope>`

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('bancodebogota', xml);

            localStorage.setItem(`bancoDeBogota.paymentConfirmationCode`, this.paymentConfirmationCode)
            localStorage.setItem(`bancoDeBogota.paymentSchedule`, JSON.stringify(this.paymentSchedule))
            localStorage.setItem(`bancoDeBogota.agreement`, this.agreement)
        }
    }
}


</script>