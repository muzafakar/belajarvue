<template>
  <div>
    <AppToolbar/>
    <AppDrawer/>
    <v-content>
      <v-container fluid>
        <!-- Change to router-view -->
        <v-flex xs12>
          <router-view></router-view>
          <v-fab-transition>
            <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="primary"
              v-show="showFab"
              @click.stop="showDialog"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-flex>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AppToolbar from "@/components/global/AppToolbar";
import AppDrawer from "@/components/global/AppDrawer";

export default {
  components: {
    AppToolbar,
    AppDrawer
  },
  data: () => ({
    showFab: false
  }),
  methods: {
    showDialog() {
      const pageName = this.$route.name;
      console.log("pageName: " + pageName);
      window.getApp.$emit(pageName);
    }
  },
  created() {
    window.getApp.$on("TOOLBAR_TITLE", tb => {
      if (tb.title === "TV Kabel" || title.title === "Owner") {
        this.showFab = true;
      } else {
        this.showFab = false;
      }
    });
  }
};
</script>
