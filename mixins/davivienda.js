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
        findByReference() {
            if (!this.$refs.formFind.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }

            let fecha = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let reference1 = this.getReference(this.reference1)
            let reference2 = this.getReference(this.reference2)

            let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.recaudosdavivienda.com/"
 xmlns:ns2="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
    <soapenv:Header>
        <wsse:Security soap:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
            <wsse:UsernameToken>
                <wsse:Username>${this.username}</wsse:Username>
                <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this.password}</wsse:Password>
            </wsse:UsernameToken>
        </wsse:Security>
    </soapenv:Header>
        <soapenv:Body>
            <ser:consultaRecaudo>
                <dto>
                    <canal>${this.paymentChannel.value}</canal>
                    <codigoBanco>51</codigoBanco>
                    <codigoIAC>0000000000</codigoIAC>
                    <fechaVencimiento>${fecha}</fechaVencimiento>
                    <jornadaPago>${this.paymentSchedule.value}</jornadaPago>
                    <numeroConvenio>${this.agreement}</numeroConvenio>
                    <referencia1>${reference1}</referencia1>
                    <referencia2>${reference2}</referencia2>
                    <terminalRecaudo>${this.terminal}</terminalRecaudo>
                    <tipoMoneda>COP</tipoMoneda>
                    <valorFactura>${this.paymentAmount}.00</valorFactura>
                    <valorPagar>${this.paymentAmount}.00</valorPagar>
                </dto>
            </ser:consultaRecaudo>
        </soapenv:Body></soapenv:Envelope>`;

            localStorage.setItem(`davivienda.agreement`, this.agreement)
            localStorage.setItem(`davivienda.paymentSchedule`, JSON.stringify(this.paymentSchedule))
            localStorage.setItem(`davivienda.terminal`, this.terminal)
            localStorage.setItem(`davivienda.paymentChannel`, JSON.stringify(this.paymentChannel))

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('ServicioRecaudosDavivienda', xml);
        },
        pay() {
            if (!this.$refs.formPay.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }

            let dueDate = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let paymentDate = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let hours = (this.paymentTime ? this.paymentTime : (new Date()).toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit', hour12: false
            })).replaceAll(':', '') + '00'
            let reference1 = this.getReference(this.reference1)
            let reference2 = this.getReference(this.reference2)

            let cashAmount = !this.cashAmount ? 0 : this.cashAmount
            let checkAmount = !this.checkAmount ? 0 : this.checkAmount
            let invoiceAmount = !this.invoiceAmount ? 0 : this.invoiceAmount
            let totalAmount = cashAmount + checkAmount

            let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.recaudosdavivienda.com/"
            xmlns:ns2="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
               <soapenv:Header>
                   <wsse:Security soap:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
                       <wsse:UsernameToken>
                           <wsse:Username>${this.username}</wsse:Username>
                           <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this.password}</wsse:Password>
                       </wsse:UsernameToken>
                   </wsse:Security>
               </soapenv:Header>
                   <soapenv:Body>
                   <ser:notificacionRecaudo>
                   <dto>
                       <canalRecaudo>${this.paymentChannel.value}</canalRecaudo>
                       <codigoBanco>51</codigoBanco>
                       <codigoConfirmacionRecaudo>${this.paymentConfirmationCode}</codigoConfirmacionRecaudo>
                       <codigoIAC>00000000000</codigoIAC>
                       <fechaRecaudo>${paymentDate}</fechaRecaudo>
                       <fechaVencimiento>${dueDate}</fechaVencimiento>
                       <formaPago>${this.paymentMethod.value}</formaPago>
                       <horaRecaudo>${hours}</horaRecaudo>
                       <jornadaRecaudo>${this.paymentSchedule.value}</jornadaRecaudo>
                       <numeroCheque>${this.checkNumber}</numeroCheque>
                       <numeroConvenio>${this.agreement}</numeroConvenio>
                       <oficinaRecaudo>${this.paymentOffice}</oficinaRecaudo>
                       <referencia1>${reference1}</referencia1>
                       <referencia2>${reference2}</referencia2>
                       <terminalRecaudo>${this.terminal}</terminalRecaudo>
                       <tipoCanje>${this.exchangeType.value ?? ''}</tipoCanje>
                       <tipoMoneda>COP</tipoMoneda>
                       <valorCheque>${checkAmount}.00</valorCheque>
                       <valorEfectivo>${cashAmount}.00</valorEfectivo>
                       <valorFactura>${invoiceAmount}.00</valorFactura>
                       <valorTotalRecaudado>${totalAmount}.00</valorTotalRecaudado>
                    </dto>
                </ser:notificacionRecaudo>
            </soapenv:Body></soapenv:Envelope>`

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('ServicioRecaudosDavivienda', xml);

            localStorage.setItem(`davivienda.paymentConfirmationCode`, this.paymentConfirmationCode)
            localStorage.setItem(`davivienda.paymentOffice`, this.paymentOffice)
        },
        rollback() {
            if (!this.$refs.formRollback.validate()) {
                $nuxt.$emit('showToast', this.$t('generals.invalid_form'))
                return
            }

            let dueDate = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let paymentDate = (this.invoiceDueDate ? this.invoiceDueDate : (new Date()).toLocaleDateString('en-CA')).replaceAll('-', '');
            let hours = (this.paymentTime ? this.paymentTime : (new Date()).toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit', hour12: false
            })).replaceAll(':', '') + '00'
            let reference1 = this.getReference(this.reference1)
            let reference2 = this.getReference(this.reference2)
            let cashAmount = !this.cashAmount ? 0 : this.cashAmount
            let checkAmount = !this.checkAmount ? 0 : this.checkAmount
            let invoiceAmount = !this.invoiceAmount ? 0 : this.invoiceAmount
            let totalAmount = cashAmount + checkAmount

            let xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.recaudosdavivienda.com/"
            xmlns:ns2="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
               <soapenv:Header>
                   <wsse:Security soap:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
                       <wsse:UsernameToken>
                           <wsse:Username>${this.username}</wsse:Username>
                           <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${this.password}</wsse:Password>
                       </wsse:UsernameToken>
                   </wsse:Security>
            </soapenv:Header>
                <soapenv:Body>
                    <ser:reversionNotificacionRecaudo>
                        <dto>
                            <canal>${this.paymentChannel.value}</canal>
                            <codigoBanco>51</codigoBanco>
                            <codigoConfirmacionRecaudo>${this.paymentConfirmationCode}</codigoConfirmacionRecaudo>
                            <codigoIAC>000000000000</codigoIAC>
                            <fechaRecaudo>${paymentDate}</fechaRecaudo>
                            <fechaVencimiento>${dueDate}</fechaVencimiento>
                            <horaRecaudo>${hours}</horaRecaudo>
                            <indicadorTipoCanje>${this.exchangeType.value ?? ''}</indicadorTipoCanje>
                            <jornadaRecaudo>${this.paymentSchedule.value}</jornadaRecaudo>
                            <numeroChequeGirado>${this.checkNumber}</numeroChequeGirado>
                            <numeroConvenio>${this.agreement}</numeroConvenio>
                            <oficinaRecaudo>${this.paymentOffice}</oficinaRecaudo>
                            <referencia1>${reference1}</referencia1>
                            <referencia2>${reference2}</referencia2>
                            <terminalRecaudo>${this.terminal}</terminalRecaudo>
                            <tipoMoneda>COP</tipoMoneda>
                            <valorCheque>${checkAmount}.00</valorCheque>
                            <valorEfectivo>${cashAmount}.00</valorEfectivo>
                            <valorFactura>${invoiceAmount}.00</valorFactura>
                            <valorTotalReversado>${totalAmount}.00</valorTotalReversado>
                        </dto>
                    </ser:reversionNotificacionRecaudo>
                </soapenv:Body>
            </soapenv:Envelope>`

            $nuxt.$emit('newSoapRequest', xml)
            this.makeRequest('ServicioRecaudosDavivienda', xml);
        }
    },
}