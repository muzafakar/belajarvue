<template>
  <v-navigation-drawer fixed app width="250" :mini-variant="mini" v-model="drawer">
    <v-toolbar :color="drawerColor" dark flat>
      <v-avatar size="36" @click="backToDashboard">
        <!-- <img src="../assets/logo.svg" alt="admin" height="36"> -->
        <v-btn icon>
          <v-icon>arrow_back</v-icon>
        </v-btn>
      </v-avatar>
      <v-toolbar-title class="ml-0 pl-3">
        <span>TV Kabel Info</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-tile v-for="item in items" :key="item.key" @click="navigateTo(item)">
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
    drawerColor: "primary",
    items: [
      {
        title: "Detail",
        icon: "domain",
        direction: "main",
        color: "primary"
      },
      {
        title: "Dusun",
        icon: "location_city",
        direction: "dusun",
        color: "yellow darken-3",
        fab: true
      },
      {
        title: "Customer",
        icon: "group",
        direction: "customer",
        color: "green darken-3",
        fab: true
      },
      {
        title: "Worker",
        icon: "supervised_user_circle",
        direction: "worker",
        color: "cyan darken-3",
        fab: true
      }
    ]
  }),
  methods: {
    navigateTo(menu) {
      this.drawerColor = menu.color;
      window.getApp.$emit("TOOLBAR_TITLE", menu);
      this.$router.push("/tvkabel/" + menu.direction);
    },
    toggleDrawerMini() {
      console.log("mini drawer action");
      this.mini = !this.mini;
    },
    backToDashboard() {
      this.$store.commit("cacheTvKabelIndex", null);
      this.$store.commit("cacheViewedTvKabel", {});
      this.$router.push("/dashboard/tvkabel");
    }
  },
  created() {
    window.getApp.$on("APP_DRAWER_TOGGLE", () => {
      console.log("drawer action");
      this.drawer = !this.drawer;
    });
  }
};
</script>