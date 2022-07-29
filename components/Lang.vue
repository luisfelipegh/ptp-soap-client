<template>
    <v-menu top>
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on" :icon="true">
                <v-icon>mdi-translate</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(item, i) in languages" :key="i" :to="switchLocalePath(item.code)" router exact>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import lang from '../config/lang'

export default {
    data() {
        return {
            languages: lang
        }
    }
}
</script>