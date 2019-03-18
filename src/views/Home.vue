<template>
  <v-app>
   <AppToolbar/>
   <AppDrawer/>
    <v-content>
      <v-container fluid>
        <!-- Change to router-view -->
        <HelloWorld/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import AppToolbar from "../components/AppToolbar";
import AppDrawer from "../components/AppDrawer";

export default {
  components: {
    AppToolbar,
    AppDrawer,
    HelloWorld
  }
};
</script>
