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
        <Table v-bind:obj="ownerTable" :data="$store.state.owner"/>
      </v-flex>
      <v-flex xs12>
        <Table v-bind:obj="tvkabelTable" :data="$store.state.owner"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Table from "../tables/Table";
import StatCard from "../stats/StatCard";
export default {
  components: {
    Table,
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
      color: "amber darken-2"
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
    },
    ownerTable: {
      title: "Owner",
      color: "cyan",
      headers: [
        { text: "Name", align: "left", value: "name" },
        { text: "Phone", align: "left", value: "phone" },
        { text: "Email", align: "left", value: "email" },
        { text: "Address", align: "left", value: "address" }
      ]
    },
    tvkabelTable: {
      title: "TV Kabel",
      color: "amber darken-2",
      headers: [
        { text: "Name", align: "left", value: "name" },
        { text: "Phone", align: "left", value: "phone" },
        { text: "Email", align: "left", value: "email" },
        { text: "Address", align: "left", value: "address" }
      ]
    }
  })
};
</script>
