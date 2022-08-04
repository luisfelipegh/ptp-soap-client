<template>
    <div>
        <Loading :loading="loading"></Loading>
        <v-form v-model="valid" ref="formFind" lazy-validation>
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
                            :return-value.sync="paymentTimeMenu" transition="scale-transition" offset-y
                            max-width="290px" min-width="290px">
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
import avvillas from '../../../mixins/av_villas'
import Loading from '~/components/Loading.vue'

export default {
    name: "findByReference",
    mixins: [avvillas],
    components: {
        Loading
    },
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
        findByReference() {
            if (!this.$refs.formFind.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }

            let fecha = this.getDate(this.paymentDate)
            let time = this.getTime(this.paymentTime)
            let reference1 = this.getReference(this.reference1)

            let xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                <soapenv:Body>
                    <es:oe_consultarFacturaEstandar xmlns:es="http://organizacion.com/wsEstandar/">
                        <codBancoOrigen>1052</codBancoOrigen>
                        <codCanal>0</codCanal>
                        <nroProducto>${this.agreement}</nroProducto>
                        <codOficinaOrigen>${this.paymentOffice}</codOficinaOrigen>
                        <codCiudad>05001</codCiudad>
                        <fechaTransaccion>${fecha}</fechaTransaccion>
                        <horaTransaccion>${time}</horaTransaccion>
                        <fechaCompensacion>${fecha}</fechaCompensacion>
                        <referencia1>${reference1}</referencia1>
                        <referencia2>0000000000000000</referencia2>
                        <referencia3>0000000000000000</referencia3>
                        <referencia4>0000000000000000</referencia4>
                    </es:oe_consultarFacturaEstandar>
                </soapenv:Body>
            </soapenv:Envelope>`;

            localStorage.setItem(`avVillas.agreement`, this.agreement)
            localStorage.setItem(`avVillas.paymentOffice`, this.paymentOffice)

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('avvillas', xml);
        },
    }
}
</script>