<template>
  <div>
    <div class="light-blue darken-1">
      <v-btn flat icon color="white" @click="backToInstance">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <span class="light-blue darken-1 pl-2 white--text">{{viewInstance.name}}</span>
    </div>
    <v-tabs
      centered
      color="light-blue darken-1"
      dark
      icons-and-text
      slider-color="blue-grey darken-4"
    >
      <v-tab v-for="item in tabItem" :key="item.key" @click="navigateTo(item.destination)">
        {{item.title}}
        <v-icon>{{item.icon}}</v-icon>
      </v-tab>
    </v-tabs>
    <router-view/>
  </div>
</template>

<script>
const firebase = require("../../plugins/firebase");
export default {
  data: () => ({
    viewInstance: null,
    tabItem: [
      {
        icon: "info",
        title: "Detail",
        destination: "detail" /* /instance/:id/detail */
      },
      {
        icon: "account_circle",
        title: "Customer",
        destination: "customer" /* /instance/:id/customer */
      },
      {
        icon: "location_city",
        title: "Dusun",
        destination: "dusun"
      } /* /instance/:id/dusun */,
      {
        icon: "supervised_user_circle",
        title: "Worker",
        destination: "worker" /* /instance/:id/worker */
      }
    ]
  }),
  created() {
    this.viewInstance = this.$store.state.viewInstance;
  },

  methods: {
    navigateTo(destination) {
      this.$router.push({
        path: `/instance/${this.viewInstance.id}/${destination}`
      });
    },

    backToInstance() {
      this.$store.commit("clearCacehInstance");
      this.$router.push("/instance");
    }
  }
};
</script>
