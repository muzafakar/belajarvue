<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="ownerStat" :count="$store.state.owner.length"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="tvKabelStat" :count="$store.state.tvkabel.length"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="customerStat" :count="9999"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="appUserStat" :count="9999"/>
      </v-flex>
      <v-flex xs12 class="mb-4">
        <TableTvKabel/>
      </v-flex>
      <v-flex xs12>
        <TableOwner/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TableOwner from "@/components/tables/TableOwner";
import TableTvKabel from "@/components/tables/TableTvKabel";
import StatCard from "@/components/stats/StatCard";
export default {
  components: {
    TableOwner,
    TableTvKabel,
    StatCard
  },

  data: () => ({
    ownerStat: {
      title: "Owner",
      icon: "face",
      color: "cyan"
    },
    tvKabelStat: {
      title: "TV Kabel",
      icon: "domain",
      color: "amber darken-3"
    },
    customerStat: {
      title: "Customer",
      icon: "group",
      color: "green"
    },
    appUserStat: {
      title: "App User",
      icon: "phone_android",
      color: "red"
    }
  })
};
</script>
