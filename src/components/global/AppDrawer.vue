<template>
  <v-navigation-drawer fixed app width="250" :mini-variant="mini" v-model="drawer">
    <v-toolbar :color="drawerColor" dark flat>
      <v-toolbar-title class="ml-0 pl-3">Eiuran Admin</v-toolbar-title>
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
        title: "Dashboard",
        icon: "dashboard",
        direction: "main",
        color: "primary"
      },
      {
        title: "Owner",
        icon: "face",
        direction: "owner",
        color: "cyan"
      },
      {
        title: "TV Kabel",
        icon: "domain",
        direction: "tvkabel",
        color: "amber darken-3"
      }
    ]
  }),
  methods: {
    navigateTo(menu) {
      this.drawerColor = menu.color;
      window.getApp.$emit("TOOLBAR_TITLE", {
        title: menu.title,
        color: menu.color
      });
      this.$router.push("/dashboard/" + menu.direction);
    },
    toggleDrawerMini() {
      console.log("mini drawer action");
      this.mini = !this.mini;
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