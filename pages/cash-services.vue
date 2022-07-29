<template>
  <v-container>
    <h1>{{ $t('cash_services.title') }}</h1>
    <v-list>
      <v-row>
        <v-col v-for="(item, i) in cashServices" :key="i" cols="12" sm="2" md="1" class="align-self-center">
          <img :src="item.icon" :alt="item.name" @click="selectService(item.component)">
        </v-col>
      </v-row>
    </v-list>
    <component :is="selectedService"></component>
    <RequestResponse></RequestResponse>
  </v-container>
</template>

<script>
import cash_services from '~/config/cash_services'
import Davivienda from '~/components/cashServices/Davivienda'
import RequestResponse from '~/components/RequestResponse.vue'

export default {
  name: 'CashServices',
  components: {
    Davivienda,
    RequestResponse
},
  data() {
    return {
      cashServices: cash_services,
      selectedService: null
    }
  },
  methods: {
    selectService(component) {
      this.selectedService = component
    }
  },
}
</script>
