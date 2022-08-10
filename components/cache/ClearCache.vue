<template>
    <div>
        <Loading :loading="loading"></Loading>
        <v-form>
            <v-container class="pa-0">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-combobox chips deletable-chips multiple v-model="tags" :items="cacheTags"
                            :label="$t('cache.fields.tags')">
                        </v-combobox>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-combobox multiple chips deletable-chips v-model="sites" :label="$t('cache.fields.sites')">
                        </v-combobox>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-combobox multiple chips deletable-chips v-model="merchants"
                            :label="$t('cache.fields.merchants')">
                        </v-combobox>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="12" align="end">
                        <template>
                            <v-row justify="end">
                                <v-dialog v-model="dialog" persistent max-width="600">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                            {{ $t('generals.clear') }}
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="text-h5" v-if="isFull">
                                            {{ $t('cache.messages.dialog_title_all') }}
                                        </v-card-title>
                                        <v-card-title class="text-h5" v-else>
                                            {{ $t('cache.messages.dialog_title_tags') }}
                                        </v-card-title>
                                        <v-card-text>
                                            <b v-if="!!tags.length">{{ $t('cache.fields.tags') }}</b>
                                            <li v-for="item in tags">{{ item.text }}</li>
                                            <b v-if="!!sites.length">{{ $t('cache.fields.sites') }}</b>
                                            <li v-for="item in sites">{{ item }}</li>
                                            <b v-if="!!merchants.length">{{ $t('cache.fields.merchants') }}</b>
                                            <li v-for="item in merchants">{{ item }}</li>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="secondary" text @click="dialog = false">
                                                {{ $t('generals.cancel') }}
                                            </v-btn>
                                            <v-btn color="primary" text @click="clearCache">
                                                {{ $t('generals.clear') }}
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-row>
                        </template>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>
<script>
import Loading from '../Loading.vue'
export default {
    components: {
        Loading
    },
    props: {
        username:'',
        password:''
    },
    data() {
        return {
            dialog: false,
            loading: false,
            sites: [],
            merchants: [],
            tags: [],
            urlBase: 'https://test.placetopay.com/soap/',
            cacheTags: [
                {
                    value: 'pse',
                    text: this.$i18n.t('cache.fields.cacheTags.pse')
                },
                {
                    value: 'bancolombia',
                    text: this.$i18n.t('cache.fields.cacheTags.bancolombia')
                },
                {
                    value: 'payment_methods',
                    text: this.$i18n.t('cache.fields.cacheTags.payment_methods')
                },
                {
                    value: 'currencies',
                    text: this.$i18n.t('cache.fields.cacheTags.currencies')
                },
                {
                    value: 'settings',
                    text: this.$i18n.t('cache.fields.cacheTags.settings')
                },
                {
                    value: 'site',
                    text: this.$i18n.t('cache.fields.cacheTags.site')
                },
                {
                    value: 'merchant',
                    text: this.$i18n.t('cache.fields.cacheTags.merchant')
                },
                {
                    value: 'language',
                    text: this.$i18n.t('cache.fields.cacheTags.language')
                },
                {
                    value: 'providers',
                    text: this.$i18n.t('cache.fields.cacheTags.providers')
                },
            ],
        }
    },
    computed: {
        isFull() {
            return !this.sites.length && !this.merchants.length && !this.tags.length
        }
    },
    methods: {
        clearCache() {
            this.dialog = false
            let endpoint = 'api/core/cache/clear'
            let base = localStorage.getItem(`generalSettings.url`) ?? this.urlBase;
            const url = base.endsWith('/') ? base + endpoint : `${base}/${endpoint}`;

            let request = {
                auth: {
                    username: this.username,
                    password: this.password
                },
                tags: this.tags.map(function (tag) {
                    return tag.value;
                }),
                sites: this.sites,
                merchants: this.merchants
            }
            this.loading = true;
            this.$axios({ method: 'post', url, data: request }).then((response) => {
                $nuxt.$emit('showToast', response.data.message, 5000, 'success')
            }).catch((error) => {
                $nuxt.$emit('showToast', error.response.data.message, 5000, 'error')
            }).finally(() => {
                this.loading = false
            });
        }
    }
}
</script>