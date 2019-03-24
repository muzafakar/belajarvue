<template>
  <div>
    <AppToolbar/>
    <TVKabelDrawer/>
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
              :color="fabColor"
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
import TVKabelDrawer from "@/components/global/TVKabelDrawer";

export default {
  components: {
    AppToolbar,
    TVKabelDrawer
  },
  data: () => ({
    showFab: false,
    fabColor: ""
  }),
  methods: {
    showDialog() {
      const pageName = this.$route.name;
      console.log("pageName: " + pageName);
      window.getApp.$emit(pageName);
    }
  },
  createdmounted() {
    window.getApp.$on("TOOLBAR_TITLE", props => {
      if (props.fab) {
        this.showFab = true;
        this.fabColor = props.color;
      } else {
        this.showFab = false;
      }
    });
  }
};
</script>
