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
        if(localStorage.getItem(`davivienda.agreement`)){
            this.agreement = localStorage.getItem(`davivienda.agreement`)
        }
        if(localStorage.getItem(`davivienda.paymentSchedule`)){
            this.paymentSchedule = JSON.parse(localStorage.getItem(`davivienda.paymentSchedule`))
        }
        if(localStorage.getItem(`davivienda.terminal`)){
            this.terminal = localStorage.getItem(`davivienda.terminal`)    
        }
        if(localStorage.getItem(`davivienda.paymentChannel`)){
            this.paymentChannel = JSON.parse(localStorage.getItem(`davivienda.paymentChannel`))
        }

        this.invoiceDueDate = (new Date()).toLocaleDateString('en-CA');
    }
}
</script>