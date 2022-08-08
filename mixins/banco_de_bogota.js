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
            bankCode: '001',
            paymentSchedules: [
                { value: '0', text: this.$i18n.t('cash_services.services.bancoDeBogota.fields.paymentSchedules.normal') },
                { value: '1', text: this.$i18n.t('cash_services.services.bancoDeBogota.fields.paymentSchedules.additional') },
            ],
            rules: {
                paymentDate: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentTime: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                agreement: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                reference: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 24 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.bancoDeBogota.fields.reference'),
                        value: 24
                    }),
                ],
                cashAmount: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                checkAmount: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentConfirmationCode: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 20 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.paymentConfirmationCode'),
                        value: 20
                    }),
                ],
            }
        }
    },
    methods: {
        getClientDt() {
            return `${this.getDate()}${this.getTime()}`
        },
        getDate(date) {
            return (date ? date : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
        },
        getTime(time) {
            return (time ? time : (new Date()).toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit', hour12: false
            })).replaceAll(':', '') + '00'
        }
    },
}