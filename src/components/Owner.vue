<template>
  <v-container fluid grid-list-lg>
      <OwnerTable/>
  </v-container>
</template>

<script>
import OwnerTable from "./tables/OwnerTable";
export default {
  components: {
    OwnerTable
  }
};
</script>

