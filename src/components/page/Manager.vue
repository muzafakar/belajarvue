<template>
  <div>
    <Toolbar title="Manager"/>
    <Drawer v-bind:items="drawerItem" v-bind:subheader="subheader" :showBack="true"/>
    <v-content>
      <v-tabs
        centered
        v-model="active"
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
    </v-content>
  </div>
</template>

<script>
import Toolbar from "@/components/global/Toolbar";
import Drawer from "@/components/global/Drawer";
export default {
  components: {
    Toolbar,
    Drawer
  },
  data: () => ({
    subheader: "{{Nama TV Kabel}}",
    tabItem: [
      { icon: "info", title: "Detail", destination: "/instance/detail" },
      {
        icon: "account_circle",
        title: "Customer",
        destination: "/instance/customer"
      },
      { icon: "location_city", title: "Dusun", destination: "/instance/dusun" },
      {
        icon: "supervised_user_circle",
        title: "Worker",
        destination: "/instance/worker"
      }
    ],
    drawerItem: [
      { icon: "dashboard", title: "Dashboard", destination: "/dashboard" },
      { icon: "domain", title: "Instance", destination: "/instance" }
    ]
  }),
  methods: {
    navigateTo(destination) {
      this.$router.push(destination);
    }
  }
};
</script>
