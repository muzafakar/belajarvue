<template>
  <v-navigation-drawer fixed app width="250" :mini-variant.sync="mini" v-model="drawer">
    <v-toolbar color="primary" dark flat>
      <v-avatar size="36">
        <img src="../assets/logo.svg" alt="admin" height="36">
      </v-avatar>
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Vue Material</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-tile v-for="item in items" :key="item.key" @click="item.click">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    mini: false,
    drawer: true,
    items: [
      {
        title: "Dashboard",
        icon: "dashboard",
        click: e => {
          console.log(e);
        }
      },
      {
        title: "Instance",
        icon: "account_balance",
        click: e => {
          console.log(e);
        }
      },
      {
        title: "Profile",
        icon: "person",
        click: e => {
          console.log(e);
        }
      }
    ]
  }),
  created() {
    window.getApp.$on("APP_DRAWER_TOGGLE", () => {
      console.log("drawer action");
      this.drawer = !this.drawer;
    });
  }
};
</script>