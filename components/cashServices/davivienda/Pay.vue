<template>
    <v-form v-model="valid">
        <v-container class="pa-0">
            <v-row>
                <v-col cols="12" md="4">
                    <v-combobox v-model="paymentChannel" :items="paymentChannels"
                        :label="$t('cash_services.services.davivienda.fields.paymentChannel')"
                        :rules="rules.paymentChannel">
                    </v-combobox>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="paymentConfirmationCode" :counter="8"
                        :rules="rules.paymentConfirmationCode" type="number"
                        :label="$t('cash_services.services.davivienda.fields.paymentConfirmationCode')" required>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="iacCode" :counter="13" :rules="rules.iacCode" type="number"
                        :label="$t('cash_services.services.davivienda.fields.iacCode')" required>
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
                                :label="$t('cash_services.services.davivienda.fields.paymentDate')"
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
                <v-col cols="12" md="4">                
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
            </v-row>
        </v-container>
    </v-form>
</template>
<script>
import davivienda from './davivienda'

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
            iacCode: '',
            paymentMethod: '',
            paymentSchedule: '',
            checkNumber:'',
            agreement: '',
            paymentOffice: '',
            reference1: '',
            reference2: '',
            terminal: '',
        }
    }
}
</script>