<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <h1>{{$store.state.tvkabel[index]}}</h1>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="dusun" :count="$store.state.tvkabel[index].dusunCount"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="customer" :count="$store.state.tvkabel[index].customerCount"/>
      </v-flex>
      <v-flex xs12 sm6 md4 lg3 class="mb-4">
        <StatCard v-bind:obj="worker" :count="$store.state.tvkabel[index].workerCount"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StatCard from "@/components/stats/StatCard";
export default {
  components: {
    StatCard
  },
  data: () => ({
    index: null,
    dusun: {
      title: "Dusun",
      icon: "location_city",
      color: "yellow darken-3"
    },
    customer: {
      title: "Customer",
      icon: "group",
      color: "green darken-3"
    },
    worker: {
      title: "Worker",
      icon: "supervised_user_circle",
      color: "blue darken-3"
    }
  }),

  created() {
    this.index = this.$store.state.tvkabelindex;
  }
};
</script>
