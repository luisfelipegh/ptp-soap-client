<template>
    <v-card>
        <v-card-title class="headline">{{ $t('cash_services.services.avVillas.name') }}</v-card-title>
        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-col cols="12" md="12">
                    <v-combobox v-model="action" :items="actions" :label="$t('cash_services.fields.action')">
                    </v-combobox>
                </v-col>
            </v-row>
            <v-row align="center" class="mx-0">
                <v-col cols="12" md="12">
                    <component v-if="action" :is="action.value"></component>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import FindByReference from './avvillas/FindByReference.vue';
import Pay from './avvillas/Pay.vue';
import Rollback from './avvillas/Rollback.vue';

export default {
    name: 'DaviviendaService',
    components: {
        FindByReference,
        Pay,
        Rollback
    },
    data() {
        return {
            action: null,
            actions: [],
        }
    },
    beforeMount() {
        this.actions = [
            {
                text: this.$i18n.t('cash_services.services.avVillas.actions.findByReference'),
                value: FindByReference
            },
            {
                text: this.$i18n.t('cash_services.services.avVillas.actions.pay'),
                value: Pay
            },
            {
                text: this.$i18n.t('cash_services.services.avVillas.actions.rollback'),
                value: Rollback
            }
        ]
    }
};

</script>