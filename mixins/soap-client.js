const { XMLParser, XMLBuilder, XMLValidator } = require('fast-xml-parser');

export default {
    data() {
        return {
            urlBase: 'https://test.placetopay.com/soap/',
            loading: false
        }
    },
    methods: {
        makeRequest(endpoint, request) {
            let base = localStorage.getItem(`generalSettings.url`) ?? this.urlBase;

            const url = base.endsWith('/') ? base + endpoint : `${base}/${endpoint}`;
            const headers = {
                'Content-Type': 'text/xml;charset=UTF-8',
            };

            this.loading = true;
            this.$axios({ method: 'post', url, headers, data: request }).then((response) => {
                $nuxt.$emit('newSoapResponse', response)
            }).catch((error) => {
                $nuxt.$emit('newSoapResponse', error.response)
            }).finally(() => {
                this.loading = false
            });
        }
    }
}