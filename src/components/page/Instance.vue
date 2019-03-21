<template>
  <v-container fluid grid-list-lg>
    <InstanceTable/>
    <NewInstance/>
  </v-container>
</template>

<script>
import InstanceTable from "../tables/InstanceTable";
import NewInstance from "../modal/NewInstance";
export default {
  components: {
    InstanceTable,
    NewInstance
  }
};
</script>

