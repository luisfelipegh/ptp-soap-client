<template>
  <v-container>
    <h1>{{ $t('cash_services.title') }} {{ this.serviceName ? ' - ' + this.serviceName : '' }}</h1>
    <v-list>
      <v-row v-if="!isList" class="justify-space-around">
        <v-col v-for="(item, i) in cashServices" :key="i" cols="12" sm="1" md="1" class="align-self-center">
          <img :src="item.icon" :alt="item.name" @click="selectService(item)">
        </v-col>
      </v-row>
      <v-list v-else dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in cashServices" :key="i" @click="selectService(item)">
            <v-list-item-content>
              <v-list-item-title v-text="$t(item.name)"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-list>
    <component :is="selectedService"></component>
    <RequestResponse></RequestResponse>
  </v-container>
</template>

<script>
import cash_services from '~/config/cash_services'
import Davivienda from '~/components/cashServices/Davivienda'
import RequestResponse from '~/components/RequestResponse.vue'
import AvVillas from '~/components/cashServices/AvVillas.vue'
import BancoDeBogota from '~/components/cashServices/BancoDeBogota.vue'
import Bancolombia from '~/components/cashServices/Bancolombia.vue'
import BancoDeOccidente from '~/components/cashServices/BancoDeOccidente.vue'

export default {
  name: 'CashServices',
  components: {
    Davivienda,
    RequestResponse,
    AvVillas,
    BancoDeBogota,
    Bancolombia,
    BancoDeOccidente
  },
  data() {
    return {
      cashServices: cash_services,
      selectedService: null,
      serviceName: '',
    }
  },
  computed: {
    isList() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
    },
  },
  methods: {
    selectService(item) {
      $nuxt.$emit('cleanRequestResponse')
      this.selectedService = item.component
      this.serviceName = this.$i18n.t(item.name)
    }
  },
}
</script>
