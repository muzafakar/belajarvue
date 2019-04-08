<template>
  <v-toolbar color="light-blue darken-1" app dark flat>
    <v-btn icon class="hidden-md-and-up" @click="toggleDrawer">
      <v-icon>menu</v-icon>
    </v-btn>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer/>
    <v-btn flat icon color="white">
      <v-icon>receipt</v-icon>
    </v-btn>
    <v-menu offset-y transition="scale-transition" origin="top right">
      <v-btn icon large flat slot="activator">
        <v-avatar size="30px">
          <img src="../../assets/muza.png" alt="admin_profile_picture">
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
  props: {
    title: String
  },
  data: () => ({
    items: [
      {
        title: "Clean Logout",
        icon: "delete_sweep",
        action: "clean_logout"
      },
      {
        title: "Logout",
        icon: "exit_to_app",
        action: "logout"
      }
    ]
  }),
  methods: {
    handleMenuAction(action) {
      this.$store.dispatch(action);
    },

    toggleDrawer(){
      window.getApp.$emit("EVENT_TOGGLE_DRAWER")
    }
  }
};
</script>

