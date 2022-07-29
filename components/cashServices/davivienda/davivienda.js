import soapRequest from 'easy-soap-request';


export default {
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
                iacCode: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 13 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.iacCode'),
                        value: 13
                    }),
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
                    v => !!v || this.$i18n.t('validations.required'),
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
                terminal: [
                    v => !!v || this.$i18n.t('validations.required'),
                    v => v.length <= 16 || this.$i18n.t('validations.lt.string', {
                        attribute: this.$i18n.t('cash_services.services.davivienda.fields.paymentAmount'),
                        value: 16
                    }),
                ],
            }
        }
    },
    methods: {
        findByReference() {
            // example data
            let url = 'https://soap.placetopay.dev/davivienda';
            let sampleHeaders = {
            //'user-agent': 'sampleTest',
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'text/xml;charset=UTF-8',
            //'soapAction': 'https://soap.placetopay.dev/davivienda',
            };

            let xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Header/>
            <soapenv:Body>Some Data</soapenv:Body>
            </soapenv:Envelope>`;

            // usage of module
            (async () => {
            const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 }); // Optional timeout parameter(milliseconds)
            const { headers, body, statusCode } = response;
            console.log(headers);
            console.log(body);
            console.log(statusCode);
            })();
        }
    },
}