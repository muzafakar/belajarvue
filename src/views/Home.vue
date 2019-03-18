<template>
  <v-app>
   <AppToolbar/>
   <AppDrawer/>
    <v-content>
      <v-container fluid>
        <!-- Change to router-view -->
        <router-view></router-view>
        <!-- <Dashboard/> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppToolbar from "../components/AppToolbar";
import AppDrawer from "../components/AppDrawer";

export default {
  components: {
    AppToolbar,
    AppDrawer
  }
};
</script>
