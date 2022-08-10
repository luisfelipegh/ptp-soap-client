export default {
    title: 'Manejo de caché de SOAP',
    actions: {
        clear: 'Limpiar caché'
    },
    fields:{
        username: 'Usuario',
        password: 'Password',
        tags: 'Tags',
        sites: 'Id de los sitios',
        merchants: 'Id de los comercios',
        cacheTags:{
            pse : 'pse',
            bancolombia : 'bancolombia',
            payment_methods : 'Medios de pago',
            currencies : 'Monedas',
            settings : 'Configuraciones',
            site : 'Sitio',
            merchant : 'Merchant',
            language : 'Idiomas',
            providers : 'Proveedores',
        }
    },
    messages:{
        dialog_title_all: '¿Está seguro REFRESCAR toda la caché ?',
        dialog_title_tags: 'Está seguro borrar la caché de: '
    }
}