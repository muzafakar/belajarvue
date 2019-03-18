<template>
  <v-toolbar color="primary" dark app fixed>
    <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    <v-toolbar-title>Admin Panel</v-toolbar-title>
    <v-spacer/>
    <v-menu offset-y transition="slide-y-transition">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img src="../assets/muza.png" alt="admin_profile_picture">
        </v-avatar>
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.key" @click="handleMenuAction(item.action)">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "Profile",
        icon: "person",
        action: "profile"
      },
      {
        title: "Settings",
        icon: "settings",
        action: "settings"
      },
      {
        title: "Logout",
        icon: "exit_to_app",
        action: "logout"
      }
    ]
  }),
  methods: {
    handleDrawerToggle() {
      console.log("APP_DRAWER_TOGGLE");
      window.getApp.$emit("APP_DRAWER_TOGGLE");
    },
    handleMenuAction(action) {
      if (action === "logout") {
        this.$store.dispatch('userLogout')
      }
      console.log(action);
    }
  }
};
</script>
