<template>
  <v-container grid-list-lg>
    <TableDusun v-bind:items="dusun"/>
  </v-container>
</template>

<script>
import TableDusun from "@/components/tables/TableDusun";
export default {
  components: {
    TableDusun
  },
  data: () => ({
    dusun: []
  }),
  created() {
    if (this.$store.state.viewTvKabel.dusun) {
      this.dusun = this.$store.state.viewTvKabel.dusun;
      console.log("data exist");
    } else {
      this.$store.dispatch("fetchDusun");
    }
  }
};
</script>
