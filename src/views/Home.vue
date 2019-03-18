<template>
  <v-app>
    <AppToolbar/>
    <AppDrawer/>
    <v-content>
      <v-container fluid>
        <!-- Change to router-view -->
        <v-flex xs12>
          <router-view></router-view>
          <v-fab-transition>
            <v-btn fixed dark fab bottom right color="primary" v-show="showFab">
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-flex>
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
  },
  data: () => ({
    showFab: false
  }),
  created() {
    window.getApp.$on("TOOLBAR_TITLE", title => {
      if(title === "instance"){
        this.showFab = true
      }else{
        this.showFab = false
      }
    });
  }
};
</script>
