import soapClient from "./soap-client";
export default {
    props: {
        username: {
            default: ''
        },
        password: {
            default: ''
        }
    },
    mixins: [soapClient],
    data() {
        return {
            bankCode: 51,
            paymentChannels: [
                { value: '00', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.office') },
                { value: '03', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.atm') },
                { value: '05', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.redPhone') },
                { value: '11', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.automaticDebit') },
                { value: '12', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.mobileBank') },
                { value: '16', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.webPage') },
                { value: '21', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.businessPortal') },
                { value: '37', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.daviviendaApp') },
                { value: '24', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.correspondents') },
                { value: '83', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentChannels.daviplataApp') }
            ],
            paymentMethods: [
                { value: '1', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentMethods.cash') },
                { value: '2', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentMethods.check') },
                { value: '3', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentMethods.mixed') },
                { value: '4', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentMethods.creditCard') },
                { value: '6', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentMethods.accountDebit') },
            ],
            paymentSchedules: [
                { value: '0', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentSchedules.normal') },
                { value: '1', text: this.$i18n.t('cash_services.services.davivienda.fields.paymentSchedules.additional') },
            ],
            exchangeTypes: [
                { value: '2', text: this.$i18n.t('cash_services.services.davivienda.fields.exchangeTypes.own') },
                { value: '3', text: this.$i18n.t('cash_services.services.davivienda.fields.exchangeTypes.local') },
                { value: '0', text: this.$i18n.t('cash_services.services.davivienda.fields.exchangeTypes.others') },
            ],
            rules: {
                paymentConfirmationCode: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 8 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.paymentConfirmationCode'),
                        value: 8
                    }),
                ],
                paymentChannel: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentChannel: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentDate: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                invoiceDueDate: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentMethod: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentTime: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentSchedule: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                checkNumber: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 9 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.checkNumber'),
                        value: 9
                    }),
                ],
                rollbackCheckNumber: [
                    v => v.length <= 9 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.checkNumber'),
                        value: 9
                    }),
                ],
                agreement: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 8 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.agreement'),
                        value: 8
                    }),
                ],
                paymentOffice: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 6 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.paymentOffice'),
                        value: 6
                    }),
                ],
                reference1: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 32 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.reference1'),
                        value: 32
                    }),
                ],
                reference2: [
                    v => v.length <= 32 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.reference2'),
                        value: 32
                    }),
                ],
                terminal: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 6 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.terminal'),
                        value: 6
                    }),
                ],
                paymentAmount: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                cashAmount: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                checkAmount: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
            }
        }
    },
    methods: {
        getReference(reference) {
            return '0'.repeat(32 - reference.length) + '' + reference
        },
    },
}