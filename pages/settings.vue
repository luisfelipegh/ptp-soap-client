<template>
  <v-card>
    <v-card-title class="headline">
    </v-card-title>
    <v-card-text>
      <v-row class="align-center">
        <v-col cols="12" md="10">
          <v-text-field :disabled="!isEditing('url')" v-model="generalSettings.url.value" :label="$t('settings.url')"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn @click="updateSetting('url')">{{ $t('generals.' + (isEditing('url') ? 'save' : 'edit')) }}</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      generalSettings: {
        url: {
          value: null,
          editing: false,
          default: 'https://test.placetopay.com/soap/'
        }
      },
    }
  },
  beforeMount() {
    Object.keys(this.generalSettings).forEach(key => {
      this.generalSettings[key].value = localStorage.getItem(`generalSettings.${key}`) ?? this.generalSettings[key].default
    });
  },
  methods: {
    isEditing(key) {
      return this.generalSettings[key].editing
    },
    updateSetting(key) {
      if (this.generalSettings[key].editing) {
        localStorage.setItem(`generalSettings.${key}`, this.generalSettings[key].value)
      }

      this.generalSettings[key].editing = !(this.generalSettings[key].editing)
    }
  }
}
</script>
