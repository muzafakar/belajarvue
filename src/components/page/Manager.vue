<template>
  <div>
    <Toolbar title="Manager"/>
    <Drawer v-bind:items="items" v-bind:subheader="subheader" :showBack="true"/>
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
    subheader: "{{Nama TV Kabel}}",
    items: [
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
    ]
  })
};
</script>
