import soapClient from "./soap-client";

export default {
    props: {},
    mixins: [soapClient],
    data() {
        return {
            bankCode: 1052,
            rules: {
                paymentConfirmationCode: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 16 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.avVillas.fields.paymentConfirmationCode'),
                        value: 16
                    }),
                ],
                paymentDate: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                paymentTime: [
                    v => !!v || this.$i18n.t('validations.required'),
                ],
                agreement: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 16 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.avVillas.fields.agreement'),
                        value: 16
                    }),
                ],
                paymentOffice: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 3 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.avVillas.fields.paymentOffice'),
                        value: 3
                    }),
                ],
                reference1: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 16 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.avVillas.fields.reference'),
                        value: 16
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
            return '0'.repeat(16 - reference.length) + '' + reference
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