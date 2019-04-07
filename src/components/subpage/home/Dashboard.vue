<template>
  <v-layout row wrap>
    <!-- Statistict -->
    <v-layout row wrap class="light-blue darken-1">
      <countercard v-bind:obj="stat" v-for="stat in stats" v-bind:key="stat.key"/>
    </v-layout>
  </v-layout>
</template>

<script>
import Countercard from "@/components/global/Countercard";
export default {
  components: {
    Countercard
  },
  data: () => ({
    stats: [
      { icon: "person", count: 23, title: "Owner" },
      { icon: "domain", count: 23, title: "Instance" },
      { icon: "group", count: 23117, title: "Customer" },
      { icon: "phone_android", count: 23, title: "App User" }
    ]
  })
};
</script>
