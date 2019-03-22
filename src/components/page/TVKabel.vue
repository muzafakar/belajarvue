<template>
  <v-container fluid grid-list-lg>
    <InstanceTable/>
    <NewTVKabel/>
  </v-container>
</template>

<script>
import InstanceTable from "../tables/InstanceTable";
import NewTVKabel from "../modal/NewTVKabel";
export default {
  components: {
    InstanceTable,
    NewTVKabel
  }
};
</script>

