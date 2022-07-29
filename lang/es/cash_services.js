export default {
    title: 'Servicios de recaudo en efectivo',
    fields: {
        action: 'Seleccione la acción a realizar'
    },
    services: {
        davivienda: {
            name: 'Davivienda',
            fields: {
                username: 'Usuario',
                password: 'Contraseña',
                agreement: 'Convenio',
                reference: 'Referencia',
                paymentChannel: 'Canal de recaudo',
                paymentChannels: {
                    office: 'Oficina (ventanilla)',
                    atm: 'Cajero Automático',
                    redPhone: 'Teléfono Rojo',
                    automaticDebit: 'Débito Automático',
                    mobileBank: 'Banca Móvil',
                    webPage: 'Davivienda.com',
                    businessPortal: 'Portal empresarial',
                    daviviendaApp: 'App Davivienda',
                    correspondents: 'Corresponsales',
                    daviplataApp: 'App Daviplata'
                },
                paymentConfirmationCode: 'Código de confirmación de recaudo',
                iacCode: 'Código IAC',
                paymentDate: 'Fecha de recaudo',
                invoiceDueDate: 'Fecha de vencimiento de la factura',
                paymentMethod: 'Forma de pago',
                paymentTime: 'Hora de recaudo',
                paymentMethods: {
                    cash: 'Efectivo',
                    check: 'Cheque',
                    mixed: 'Mixto',
                    creditCard: 'Tarjeta de crédito',
                    accountDebit: 'Debito a cuenta'
                },
                paymentSchedule: 'Jornada de pago',
                paymentSchedules: {
                    normal: 'Jornada normal',
                    additional: 'Jornada adicional',
                },
                checkNumber: 'Numero de cheque',
                agreement: 'Número de convenio',
                paymentOffice: 'Oficina de recaudo', 
                reference1: 'Referencia 1',
                reference2: 'Referencia 2',
                terminal: 'Terminal',
                paymentAmount: 'Valor a pagar'
            },
            actions: {
                findByReference: 'Consultar por referencia',
                pay: 'Realizar un pago',
                rollback: 'Reversar un pago'
            }
        }
    }
}