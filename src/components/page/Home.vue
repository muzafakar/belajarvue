<template>
  <div>
    <Toolbar title="Dashboard"/>
    <Drawer v-bind:items="items" v-bind:subheader="subheader" :showBack="false"/>
    <v-content>
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
    subheader: "Overview",
    items: [
      { icon: "dashboard", title: "Dashboard", destination: "/dashboard" },
      { icon: "domain", title: "Instance", destination: "/instance" }
    ]
  })
};
</script>
