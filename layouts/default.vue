<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list>
        <v-list-item>
          <v-img v-if="!miniVariant" src="https://static.placetopay.com/placetopay-logo.svg"></v-img>
          <v-img v-else src="https://static.placetopay.com/admin/favicon.ico"></v-img>
        </v-list-item>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact @click="selectedPage">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app elevation="1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="$t('title')" />
      <v-spacer />
      <Lang></Lang>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Lang from '~/components/Lang.vue'
import sidebar from '~/config/sidebar'

export default {
  name: 'DefaultLayout',
  components: {
    Lang
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      items: sidebar,
      miniVariant: true,
      right: true
    }
  },
  methods: {
    selectedPage(payload) {
      console.log(payload);
    }
  }
}
</script>
