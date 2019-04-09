<template>
  <v-navigation-drawer v-model="drawer" width="250px" app class="blue-grey darken-4">
    <v-toolbar color="blue-grey darken-3" dark flat>
      <img src="../../assets/dummy_logo.png" height="40px" width="25px">
      <v-toolbar-title class="ml-0 pl-3">Eiuran Admin</v-toolbar-title>
    </v-toolbar>
    <v-divider class="mb-3"/>

    <v-subheader class="white--text">{{subheader}}</v-subheader>
    <v-list dark>
      <v-list-tile v-for="item in items" :key="item.key" @click="navigateTo(item.destination)">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider/>
    <v-list dark v-show="showBack">
      <v-list-tile @click="toDashboard">
        <v-list-tile-action>
          <v-icon>arrow_back</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Back to Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider/>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "drawer",
  props: {
    items: Array,
    subheader: String,
    showBack: Boolean
  },
  data: () => ({
    drawer: true
  }),
  methods: {
    navigateTo(destination) {
      this.$router.push(destination);
    },
    toDashboard() {
      this.$router.push("/dashboard");
    }
  },
  created() {
    window.getApp.$on("EVENT_TOGGLE_DRAWER", () => {
      this.drawer = true;
    });
  }
};
</script>


